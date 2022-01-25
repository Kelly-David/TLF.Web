import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    NavigationBarComponent,
    FooterComponent
  ]
})
export class NavigationModule { }
