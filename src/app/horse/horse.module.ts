import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HorseCollectionComponent } from './horse-collection/horse-collection.component';
import { HorsesComponent } from './horses/horses.component';
import { HorseRouteComponent } from './horse-route/horse-route.component';
import { HorseComponent } from './horse/horse.component';
import { HorseGroupsComponent } from './horse-groups/horse-groups.component';



@NgModule({
  declarations: [
    HorseCollectionComponent,
    HorsesComponent,
    HorseRouteComponent,
    HorseComponent,
    HorseGroupsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HorseModule { }
