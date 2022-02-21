import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ContactViewComponent } from './contact-view/contact-view.component';



@NgModule({
  declarations: [
    ContactViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ContactModule { }
