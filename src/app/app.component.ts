import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataImport } from './shared/services/data.import.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tlfWeb';

  constructor(
    private dataImport: DataImport
  ) {
    
    this.dataImport.ImportHorses();
  }
  
}
