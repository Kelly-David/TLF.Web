import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Strings } from 'src/app/shared/strings';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

	constructor(
		private metaService: Meta,
		private titleService: Title,
    private route: ActivatedRoute
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

}
