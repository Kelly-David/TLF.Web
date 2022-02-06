import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { HorseService } from 'src/app/shared/services/horse.service';
import { Image } from '../../shared/models/web.models';
import { ViewService } from '../../shared/services/view.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})
export class HorseComponent implements OnChanges, OnDestroy {

  @Input() horseID = '' as string;

  public horse$!: Observable<any>;

  private images!: Subscription;

  public contentReady = false;
  public contentImages!: Image[];

  constructor(
    private horseService: HorseService,
  ) { }

  ngOnDestroy(): void {
    
    this.images.unsubscribe();
  }

  ngOnChanges() {
    if (this.horseID !== '') {

      this.horse$   = this.horseService.V1GetHorseById(this.horseID);

      this.images = this.horseService.V1GetImagesByHorseId(this.horseID).subscribe(images => {
        if (images !== undefined) {

          let index = 0;

          this.contentImages = images.map(item => {

            return ({
                Id: (index++).toString(), 
                PathToFullImg: item.downloadURL, 
                PathToThumbnail: item.downloadURL,
                Description: "",
                AltText: ""
             })
          });

          this.contentReady = true;
        }
      });
    }
  }
}