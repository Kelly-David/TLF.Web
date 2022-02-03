import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { HorseService } from 'src/app/shared/services/horse.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})
export class HorseComponent implements OnChanges {

  @Input() horseID = '' as string;

  public horse$!: Observable<any>;

  constructor(
    private horsService: HorseService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    if (this.horseID !== '') {
      this.horse$ = this.horsService.V1GetHorseById(this.horseID);
    }
  }

  public getStyle(imageUrl: any, elm: number) {
    let style;
    if (elm === 1) { // header
      style = `background-image: url(${imageUrl}) !important;
        background-size: cover;
        background-position: center;
        box-shadow:inset 0 0 0 2000px rgba(0, 82, 100, 0.3)`;
    } else {
      style = `background-image: url(${imageUrl}) !important;
        background-size: cover;
        background-position: center;`;
    }
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

}