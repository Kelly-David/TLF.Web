import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Strings } from 'src/app/shared/strings';
import { Observable } from 'rxjs';
import { HorseService } from '../../shared/services/horse.service';
import { ViewService } from '../../shared/services/view.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;
  public horses$!: Observable<any[]>;
  public updatedDate!: Date;

	constructor(
		private metaService: Meta,
		private titleService: Title,
    private route: ActivatedRoute,
    private horseService: HorseService,
    private viewService: ViewService
	) {
		this.title = Strings.titleCurrentOpportunities;
		this.activeLink = Strings.routeCurrentOpportunities;

		this.routesToShow = new Array<string>(
			Strings.routeCurrentOpportunities,
			Strings.routeRecentSales
			);
	 }

	ngOnInit() {

    this.route.url.subscribe(params => {
      this.setActiveView(params[0].path);
    });

		this.titleService.setTitle(this.title);

		this.metaService.updateTag({
			name: 'Description',
			content: `Turra Lodge Farm is a family owned and operated American miniature horse breeding program
      located in the south east of Ireland.
      The Kelly Family have owned and bred miniature horses since 2005. The farm is home to a small
      group of AMHA registered miniature horses, some of which are also registered with the AMHR or
      the BMHS.`});

    // use flag-based queries instead of separate salehorses collection
    // if current opportunities view
    if (this.activeLink === Strings.routeCurrentOpportunities) {
      this.horses$ = this.horseService.V1GetAvailableHorses();
    } else {
      this.horses$ = this.horseService.V1GetSoldHorses();
    }

    this.updatedDate = new Date();
    this.updatedDate.setDate(this.updatedDate.getDate() - 3);
	}

  private setActiveView(route: string) {

    if (route === Strings.routeCurrentOpportunities) {

      this.title = Strings.titleCurrentOpportunities;
      this.activeLink = Strings.routeCurrentOpportunities;
    }
    else {
      this.title = Strings.titleRecentSales;
      this.activeLink = Strings.routeRecentSales;
    }
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
