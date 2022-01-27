import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HorseCollectionComponent } from './horse-collection/horse-collection.component';
import { HorsesComponent } from './horses/horses.component';



@NgModule({
  declarations: [
    HorseCollectionComponent,
    HorsesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HorseModule { }
