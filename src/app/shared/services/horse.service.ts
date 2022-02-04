import { Injectable } from '@angular/core';
import { OrderByDirection } from 'firebase/firestore';
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
    
    return this.firestore.doc$(`${Strings.V1horseCollection}/${horseId}`);
  }

  public V1GetHorsesByFilterType(type: string, sortField: string, sortOrder = 'asc' as string): Observable<any[]> {
    
    type      = type.toLowerCase();
    sortField = sortField.toLowerCase();

    let direction = ((sortOrder.toLowerCase() === 'asc') ? "asc" : "desc") as OrderByDirection;

    let result = this.firestore.col$(Strings.V1horseCollection, ref => ref
      .where('filter', 'array-contains', type)
      .orderBy(sortField, direction)) as Observable<any[]>;

    return result;
  }

  public V1GetHorseIdByRoute(route: string): Observable<{}> {

    return this.firestore.doc$(`${Strings.V1routeCollection}/${route}`);
  }

  public V1GetImagesByHorseId(horseId: string): Observable<any[]> {

    return this.firestore.col$(`${Strings.V1fileCollection}/${horseId}/images`);
  }
}


