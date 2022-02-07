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
      [Strings.routeShowHorses, false],
      [Strings.routeShowResults, false],
      [Strings.routePastChampions, false]
    ]);

    this.links = new Map([
      [Strings.routeOurFarm, Strings.navOurFarm],
      [Strings.routePygmyGoats, Strings.navPygmyGoats],
      [Strings.routeTheMiniatureHorse, Strings.navTheMiniatureHorse],
      [Strings.routeOurProgram, Strings.navOurProgram],
      [Strings.routeExpectedFoals, Strings.navExpectedFoals],
      [Strings.routeShowHorses, Strings.navShowHorses],
      [Strings.routeShowResults, Strings.navShowResults],
      [Strings.routePastChampions, Strings.navPastChampions]
    ]);
  }

  ngOnChanges(): void {

    this.routes.set(this.activeLink, true);
  }

}
