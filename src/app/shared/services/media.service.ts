import { Injectable } from '@angular/core';
import { FileUpload, FileUploadResult } from '../models/web.models';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService
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
}
