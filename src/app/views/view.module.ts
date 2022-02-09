import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farm/farm.component';
import { SharedModule } from '../shared/shared.module';
import { PygmyGoatsComponent } from './pygmy-goats/pygmy-goats.component';
import { ShowingComponent } from './show-horses/showing.component';
import { ShowResultsComponent } from './show-results/show-results.component';
import { PastChampionsComponent } from './past-champions/past-champions.component';
import { BreedingComponent } from './breeding/breeding.component';

@NgModule({
  declarations: [
    FarmComponent,
    PygmyGoatsComponent,
    ShowingComponent,
    ShowResultsComponent,
    PastChampionsComponent,
    BreedingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ViewModule { }
