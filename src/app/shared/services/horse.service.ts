import { Injectable } from '@angular/core';
import { OrderByDirection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Strings } from '../strings';
import { FirestoreService } from './firestore.service';
import { take } from 'rxjs/operators';

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

  public V1GetHorsesByFilterType(type: string, sortField ='name' as string, sortOrder = 'asc' as string): Observable<any[]> {
    
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

  public V1GetProgenyByParentId(parentId: string): Observable<any> {

    return this.firestore.col$(`${Strings.V1progenyCollection}/${parentId}/progeny`);
  }

  public V1GetAccoladesByHorseId(horseId: string): Observable<{}> {
    return this.firestore.col$(`${Strings.V1accoladeCollection}/${horseId}/accolade`, ref => ref.orderBy('year'));
  }

  public V1GetHorseFamilyGroupById(id: string): Observable<any> {

    return this.firestore.doc$(`${Strings.V1groupCollection}/${id}`);
  }

  public horses() {

    return this.firestore.col$("horse");
  }

  public updateHorse(id: string, data: any) {

    return this.firestore.update(`horse`, id, data).then(_ => {
    }).catch(error => {
      console.log(error);
    });
  }

  public V1GetExpectedFoalsByYear(year: string): Observable<any> {

    return this.firestore.col$(`expected/${year}/breeding`, ref => ref.orderBy('month'));
  }

  public V1GetSalesHorses(): Observable<any[]> {

    return this.firestore.col$(Strings.V1salesCollection);
  }

  public Migrate() {

    const sourceId = "RpPZ0pR8QO98w9riKZOY";

    const targetId = "xwYcCI62g6s3Nz84RcTs";

    console.log("Migrating horseId: {{" + sourceId + "}} data to horseId: {{" + targetId + "}}.")

    this.firestore.doc$('horse/' + sourceId).pipe(take(1)).subscribe((data: any) =>
      {
        let horse = { pedigree: data.pedigree};
        this.updateHorse(targetId, horse)
      });

  }


}


