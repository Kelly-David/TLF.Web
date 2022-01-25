import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { AppRoutingModule } from '../app-routing.module';
import { HorseCardComponent } from './components/horse-card/horse-card.component';


@NgModule({
  declarations: [
    HorseCardComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    AppRoutingModule
  ],
  exports: [
    MDBBootstrapModulesPro,
    AppRoutingModule,
    HorseCardComponent
  ]
})
export class SharedModule { }
