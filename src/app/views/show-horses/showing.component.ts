import { Component, OnInit } from '@angular/core';
import { Strings } from 'src/app/shared/strings';

@Component({
  selector: 'app-showings',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.scss']
})
export class ShowingComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

  constructor() {
        
    this.title = Strings.titleShowing;
		this.activeLink = Strings.routeShowing;

		this.routesToShow = new Array<string>(
			Strings.routeShowing,
      Strings.routeShowResults,
      Strings.routePastChampions
			);
   }

  ngOnInit(): void {
  }

}
