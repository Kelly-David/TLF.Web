import { Component, OnInit } from '@angular/core';
import { Strings } from 'src/app/shared/strings';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.scss']
})
export class ShowResultsComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

  constructor() {

    this.title = Strings.titleShowResults;
		this.activeLink = Strings.routeShowResults;

		this.routesToShow = new Array<string>(
			Strings.routeShowing,
      Strings.routeShowResults,
      Strings.routePastChampions
			);
   }

  ngOnInit(): void {
  }

}
