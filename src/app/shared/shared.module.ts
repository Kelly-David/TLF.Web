import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  exports: [
    AppRoutingModule,
    MDBBootstrapModulesPro,
  ]
})
export class SharedModule { }
