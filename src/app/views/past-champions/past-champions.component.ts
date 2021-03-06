import { Component, OnInit } from '@angular/core';
import { Strings } from 'src/app/shared/strings';

@Component({
  selector: 'app-past-champions',
  templateUrl: './past-champions.component.html',
  styleUrls: ['./past-champions.component.scss']
})
export class PastChampionsComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

  constructor() {
    
    this.title = Strings.titlePastChampions;
		this.activeLink = Strings.routePastChampions;

		this.routesToShow = new Array<string>(
			Strings.routeShowing,
      Strings.routeShowResults,
      Strings.routePastChampions
			);
   }

  ngOnInit(): void {
  }

}
