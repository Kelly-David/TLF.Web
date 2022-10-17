import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HorseListComponent } from './horse-list/horse-list.component';
import { HorseEditComponent } from './horse-edit/horse-edit.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
  
    DashboardComponent,
       HorseListComponent,
       HorseEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule
  ]
})
export class AdminModule { }
