import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from '../app-routing.module';
import { FeaturedComponent } from './featured/featured.component';



@NgModule({
  declarations: [
    IndexComponent,
    FeaturedComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: []
})
export class LandingModule { }
