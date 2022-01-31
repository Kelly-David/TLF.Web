import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HorseCardComponent } from './components/horse-card/horse-card.component';
import { GridComponent } from './components/grid/grid.component';
import { GridCardComponent } from './components/grid-card/grid-card.component';


@NgModule({
  declarations: [
    HorseCardComponent,
    GridComponent,
    GridCardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    HorseCardComponent,
    GridComponent
  ]
})
export class SharedModule { }
