import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { HorseService } from 'src/app/shared/services/horse.service';
import { Image } from '../../shared/models/web.models';
import { ViewService } from '../../shared/services/view.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})
export class HorseComponent implements OnChanges {

  @Input() horseID = '' as string;

  public horse$!: Observable<any>;
  public images$!: Observable<any[]>;

  public contentReady = false;
  public contentImages!: Image[];

  constructor(
    private horseService: HorseService,
  ) { }

  ngOnChanges() {
    if (this.horseID !== '') {

      this.horse$ = this.horseService.V1GetHorseById(this.horseID);

      this.images$ = this.horseService.V1GetImagesByHorseId(this.horseID);

      this.images$.subscribe(images => {
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