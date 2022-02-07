import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HorseCardComponent } from './components/horse-card/horse-card.component';
import { GridComponent } from './components/grid/grid.component';
import { GridCardComponent } from './components/grid-card/grid-card.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxContentComponent } from './components/lightbox-content/lightbox-content.component';
import { HorseLinkComponent } from './components/horse-link/horse-link.component';
import { PageNavComponent } from './components/page-nav/page-nav.component';


@NgModule({
  declarations: [
    HorseCardComponent,
    GridComponent,
    GridCardComponent,
    LightboxComponent,
    LightboxContentComponent,
    HorseLinkComponent,
    PageNavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule
  ],
  exports: [
    AppRoutingModule,
    HorseCardComponent,
    GridComponent,
    LightboxContentComponent,
    HorseLinkComponent,
    PageNavComponent
  ]
})
export class SharedModule { }
