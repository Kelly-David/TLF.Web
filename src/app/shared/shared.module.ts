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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionFilterPipe } from './pipes/collection-filter.pipe';
import { HorseResultsComponent } from './components/horse-results/horse-results.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextareaComponent } from './components/form-controls/textarea/textarea.component';
import { InputComponent } from './components/form-controls/input/input.component';
import { ListItemComponent } from './components/form-controls/list-item/list-item.component';
import { ListGroupComponent } from './components/form-controls/list-group/list-group.component';
import { ImageUploadComponent } from './components/form-controls/image-upload/image-upload.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    HorseCardComponent,
    GridComponent,
    GridCardComponent,
    LightboxComponent,
    LightboxContentComponent,
    HorseLinkComponent,
    PageNavComponent,
    CollectionFilterPipe,
    HorseResultsComponent,
    TextareaComponent,
    InputComponent,
    ListItemComponent,
    ListGroupComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppRoutingModule,
    HorseCardComponent,
    GridComponent,
    LightboxContentComponent,
    HorseLinkComponent,
    PageNavComponent,
    FormsModule,
    ReactiveFormsModule,
    CollectionFilterPipe,
    HorseResultsComponent,
    TextareaComponent,
    ListGroupComponent,
    ImageUploadComponent
  ]
})
export class SharedModule { }
