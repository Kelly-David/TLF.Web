import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Strings } from '../../strings';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnChanges {

  @Input() title!: string;
  @Input() activeLink!: string;
  @Input() routesToShow!: Array<string>;

  public routes!: Map<string, boolean>;
  public links!: Map<string, string>;

  constructor() {

    this.routes = new Map([
      [Strings.routeOurFarm, false],
      [Strings.routePygmyGoats, false],
      [Strings.routeTheMiniatureHorse, false],
      [Strings.routeOurProgram, false],
      [Strings.routeExpectedFoals, false],
      [Strings.routeShowing, false],
      [Strings.routeShowResults, false],
      [Strings.routePastChampions, false],
      [Strings.routeCurrentOpportunities, false],
      [Strings.routeRecentSales, false]
    ]);

    this.links = new Map([
      [Strings.routeOurFarm, Strings.titleOurFarm],
      [Strings.routePygmyGoats, Strings.titlePygmyGoats],
      [Strings.routeTheMiniatureHorse, Strings.titleTheMiniatureHorse],
      [Strings.routeOurProgram, Strings.titleOurProgram],
      [Strings.routeExpectedFoals, Strings.titleExpectedFoals],
      [Strings.routeShowing, Strings.titleShowing],
      [Strings.routeShowResults, Strings.titleShowResults],
      [Strings.routePastChampions, Strings.titlePastChampions],
      [Strings.routeCurrentOpportunities, Strings.titleCurrentOpportunities],
      [Strings.routeRecentSales, Strings.titleRecentSales]
    ]);
  }

  ngOnChanges(): void {

    this.routes.set(this.activeLink, true);
  }

}
