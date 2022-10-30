import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MediaService } from '../../../services/media.service';
import { FileUpload, FileUploadResult } from '../../../models/web.models';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnChanges {

  @Input() imageUrl!: string;
  @Output() changes;
  public edit = false;

  constructor(
    private mediaService: MediaService
  ) {

    this.imageUrl = "";
    this.changes = new EventEmitter<string>();
   }

  ngOnChanges(): void {
  }

  public Upload(event: any) {

    let upload = {FileName: this.mediaService.NewUid(), File: event.srcElement.files[0]} as FileUpload;

    const promise =  this.mediaService.UploadAsync(upload);

    promise.then((result: FileUploadResult) => {
      if (result.Url) {
        this.imageUrl = result.Url;
        this.changes.emit(this.imageUrl);
      }
    });
  }

}
