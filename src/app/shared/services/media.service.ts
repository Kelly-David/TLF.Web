import { Injectable } from '@angular/core';
import { FileUpload, FileUploadResult } from '../models/web.models';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService
    , private afs: AngularFirestore
  ) { }

  public NewUid(): string {
    return this.firestoreService.NewUid();
  }

  public UploadAsync(upload: FileUpload) {

    const storageRef = this.storage.ref(`uploads/${upload.FileName}`);

    return storageRef.put(upload.File)
              .then(uploadTask => uploadTask.ref.getDownloadURL()
                .then(url => {
                  return {FileName: upload.FileName, Url: url} as FileUploadResult;
                }));
  }

  /**
   * Delete an image from Storage and remove its Firestore document.
   * @param horseId the id of the horse (used as file/{horseId}/images collection)
   * @param imageId the document id under images collection
   * @param storagePath the storage path for the file (e.g. "image/1725...jpg")
   */
   public async DeleteImage(horseId: string, imageId: string, storagePath?: string): Promise<boolean> {
     try {
       // delete from storage if we have a path
       if (storagePath) {
         await this.storage.ref(storagePath).delete().toPromise?.();
       }
 
       // delete the firestore document under file/{horseId}/images/{imageId}
       let docId = imageId;
 
       // If no imageId provided, try to look up the document by storagePath or downloadURL
       if (!docId) {
         try {
           const colRef = this.afs.collection(`file/${horseId}/images`, ref => ref);
           // try to match by storagePath
           if (storagePath) {
             const snapshot = await colRef.ref.where('path', '==', storagePath).get();
             if (!snapshot.empty) {
               docId = snapshot.docs[0].id;
             }
           }
 
           // if still not found, try to match by file name or downloadURL
           if (!docId) {
             const snapshot2 = await colRef.ref.where('downloadURL', '==', storagePath).get();
             if (!snapshot2.empty) {
               docId = snapshot2.docs[0].id;
             }
           }
         } catch (err) {
           console.warn('Lookup for image document failed', err);
         }
       }
 
       if (docId) {
         await this.firestoreService.delete(`file/${horseId}/images`, docId);
       } else {
         console.warn('DeleteImage: no document id found to delete for horse', horseId, 'path', storagePath);
       }
 
       return true;
     } catch (err) {
       console.error('DeleteImage error', err);
       return false;
     }
   }

  /**
   * Scan file/{horseId}/images and delete any documents whose storage object no longer exists.
   * Returns array of deleted document ids.
   */
  public async CleanupOrphanedImages(horseId: string): Promise<string[]> {
    const deleted: string[] = [];
    try {
      const colRef = this.afs.collection(`file/${horseId}/images`).ref;
      const snapshot = await colRef.get();

      for (const doc of snapshot.docs) {
        const data: any = doc.data();
        let storagePath = data.path || data.storagePath || data.filePath;

        // if no explicit storage path, try parsing it from downloadURL
        if (!storagePath && data.downloadURL) {
          try {
            const parts = data.downloadURL.split('/o/');
            if (parts.length > 1) {
              const after = parts[1].split('?')[0];
              storagePath = decodeURIComponent(after);
            }
          } catch (err) {
            // ignore
          }
        }

        let exists = false;
        if (storagePath) {
          try {
            // try to get a download url - if file missing this will throw
            await this.storage.ref(storagePath).getDownloadURL().toPromise?.();
            exists = true;
          } catch (err) {
            exists = false;
          }
        } else {
          // no path to check; attempt to use downloadURL presence as indicator
          exists = !!data.downloadURL;
        }

        if (!exists) {
          try {
            await this.firestoreService.delete(`file/${horseId}/images`, doc.id);
            deleted.push(doc.id);
          } catch (err) {
            console.warn('Failed deleting orphan image doc', doc.id, err);
          }
        }
      }
    } catch (err) {
      console.error('CleanupOrphanedImages error', err);
    }

    return deleted;
  }

  public async UploadImageForHorse(horseId: string, file: File): Promise<{ id: string; downloadURL: string; path: string } | null> {
    try {
      // generate a filename/id for storage and the firestore doc
      const uid = this.NewUid();
      const upload = { FileName: uid, File: file } as FileUpload;

      // upload to storage
      const result = await this.UploadAsync(upload);
      if (!result || !result.Url) return null;

      const storagePath = `uploads/${uid}`;

      // create a firestore doc under file/{horseId}/images/{uid}
      const docData: any = {
        downloadURL: result.Url,
        path: storagePath,
        fileName: uid
      };

      await this.firestoreService.set(`file/${horseId}/images`, docData, uid);

      return { id: uid, downloadURL: result.Url, path: storagePath };
    } catch (err) {
      console.error('UploadImageForHorse error', err);
      return null;
    }
  }
 }
