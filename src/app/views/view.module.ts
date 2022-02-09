import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farm/farm.component';
import { SharedModule } from '../shared/shared.module';
import { PygmyGoatsComponent } from './pygmy-goats/pygmy-goats.component';
import { ShowHorsesComponent } from './show-horses/show-horses.component';
import { ShowResultsComponent } from './show-results/show-results.component';
import { PastChampionsComponent } from './past-champions/past-champions.component';

@NgModule({
  declarations: [
    FarmComponent,
    PygmyGoatsComponent,
    ShowHorsesComponent,
    ShowResultsComponent,
    PastChampionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ViewModule { }
