import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HorseService } from 'src/app/shared/services/horse.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  public horses$!: Observable<any[]>;

  constructor(private horseService: HorseService) { }

  ngOnInit() {

    this.horses$ = this.horseService.GetFeaturedHorses(6);
  }

}
