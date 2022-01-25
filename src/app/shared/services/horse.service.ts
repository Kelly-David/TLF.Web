import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Strings } from '../strings';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  constructor(
    private firestore: FirestoreService
  ) { }

  public GetFeaturedHorses(limit = 6): Observable<any> {

    return this.firestore.col$(Strings.V1featuredHorsesCollection, ref => ref.orderBy('order').limit(limit));
  }

  public V1GetHorseById(horseId: string): Observable<any> {
    
    console.log(horseId);

    return this.firestore.doc$(`${Strings.V1horseCollection}/${horseId}`);
  }

}


