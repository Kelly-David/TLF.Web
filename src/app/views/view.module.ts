import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farm/farm.component';
import { SharedModule } from '../shared/shared.module';
import { PygmyGoatsComponent } from './pygmy-goats/pygmy-goats.component';

@NgModule({
  declarations: [
    FarmComponent,
    PygmyGoatsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ViewModule { }
