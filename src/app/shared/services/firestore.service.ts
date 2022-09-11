import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/firestore';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.firestore.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.firestore.doc<T>(ref) : ref;
  }

  col$<T>(ref: CollectionPredicate<T> | string, queryFn? : QueryFn): Observable<T[]> {
    return this.col(ref, queryFn).valueChanges();
  }

  /**
   * @description Firestore Document snapshot
   */
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => {
      return doc.payload.data() as T;
    }));
  }

  /**********
   * WRITE DATA
   *********/

  /**
   * @description Return server timestamp
   */
  get timeStamp() {
    return firebase.serverTimestamp();        
  }
   
  /**
 * @description Updates a firestore doc ref
 */
  update<T>(ref: DocPredicate<T>, key: string, data: any) {
    return this.doc(ref + `/${key}`).update({
      ...data,
      updatedAt: this.timeStamp
    });
  }

  /**
    * @description Custom set method - add a single doc to a specified collection
    */
  set<T>(ref: DocPredicate<T>, data: any, id?: string) {
    const timeStamp = this.timeStamp;
    // If we pass an id, don't create one
    const uniqueRef = data.id ? data.id : this.firestore.createId();
    return this.doc(ref + `/${uniqueRef}`).set({
      ...data,
      id: uniqueRef,
      updatedAt: timeStamp,
      createdAt: timeStamp,
      deleted: false
    });
  }

  async reset<T>(ref: CollectionPredicate<T>, data: any) {
    
    const documents = (await this.firestore.firestore.collection(ref as string).get()).docs;

    documents.forEach(doc => {
        doc.ref.delete();
    })

    data.forEach((item: T | any) => {
        this.col(ref).doc(item.id).set(item);
    });
  }

  mergeSet<T>(ref: DocPredicate<T>, id: string, data: any) {
    const timeStamp = this.timeStamp;
    return this.doc(ref + `/${id}`).set({
      ...data,
      id: id,
      updatedAt: timeStamp,
      createdAt: timeStamp,
      deleted: false
    }, { merge: true });
  }

  async updateIfExists(collection: string, id: string, data: any) {
    const timeStamp = this.timeStamp;

    const document = await this.firestore.firestore.collection(collection).doc(id).get();

    if (document && document.exists) {
      await document.ref.update({
        ...data,
        visits: firebase.increment(1),
        updatedAt: timeStamp
      });
    } else {
      await document.ref.set({
        ...data,
        id: id,
        visits: 1,
        acceptedCookies: false,
        updatedAt: timeStamp,
        createdAt: timeStamp,
        deleted: false
      }, { merge: true });
    }
  }

  /**
    * @description Delete method
    */
  delete<T>(ref: DocPredicate<T>, id: string) {
    return this.doc(ref + `/${id}`).delete();
  }

}
