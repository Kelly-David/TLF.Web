import { Injectable } from '@angular/core';
import { Strings } from '../strings';
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { GlobalConfig } from '../models/web.models';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public config$!: Observable<GlobalConfig>;

  private globalConfig = 'GlobalConfig' as string;

  constructor(
    private firestore: FirestoreService
  ) { 

    // Set the Configuration object
    this.config$ = this.V1GetConfigById();
  }

  private V1GetConfigById(): Observable<GlobalConfig> {
    
    return this.firestore.doc$<GlobalConfig>(`${Strings.V1ConfigurationCollection}/${this.globalConfig}`);
  }

}
