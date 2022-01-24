import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  exports: [
    MDBBootstrapModulesPro,
  ]
})
export class SharedModule { }
