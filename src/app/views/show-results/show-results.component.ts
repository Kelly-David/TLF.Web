import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, take, combineAll } from 'rxjs/operators';
import { Strings } from 'src/app/shared/strings';
import { HorseService } from '../../shared/services/horse.service';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.scss']
})
export class ShowResultsComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;
  public horses$!: Observable<any[]>;
  public filter!: string;

  constructor(private horseService: HorseService) {

    this.title = Strings.titleShowResults;
		this.activeLink = Strings.routeShowResults;

		this.routesToShow = new Array<string>(
			Strings.routeShowing,
      Strings.routeShowResults,
      Strings.routePastChampions
			);
   }

  ngOnInit(): void {

    this.horses$ = this.horseService.horses();
 
  }

}
