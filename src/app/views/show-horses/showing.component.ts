import { Component, OnInit } from '@angular/core';
import { Strings } from 'src/app/shared/strings';
import { Observable } from 'rxjs';
import { HorseService } from '../../shared/services/horse.service';
import { ViewService } from '../../shared/services/view.service';

@Component({
  selector: 'app-showings',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.scss']
})
export class ShowingComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;
  public thisYear!: string;
  public horses$!: Observable<any[]>;

  constructor(
    private horseService: HorseService,
    private viewService: ViewService
    ) {
        
    this.title = Strings.titleShowing;
		this.activeLink = Strings.routeShowing;

		this.routesToShow = new Array<string>(
			Strings.routeShowing,
      Strings.routeShowResults,
      Strings.routePastChampions
			);
   }

  ngOnInit(): void {

    this.horses$ = this.horseService.V1GetHorsesByFilterType('showing');

    this.thisYear = new Date().getFullYear().toString();
  }

  public nameAsRoute(name: string): string {
    let route = '';
    route = name.split(' ').join('-').toLowerCase();
    return route;
  }

  public getStyleForImageAsBackground(content: any) {

    return this.viewService.GetStyleForImageAsBackground(content)
  }

}
