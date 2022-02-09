import { Component, OnInit } from '@angular/core';
import { Strings } from 'src/app/shared/strings';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html',
  styleUrls: ['./breeding.component.scss']
})
export class BreedingComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

  private routePrefix = "breeding/"

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {

    this.title = Strings.titleShowing;
		this.activeLink = Strings.routeShowing;

		this.routesToShow = new Array<string>(
			Strings.routeTheMiniatureHorse,
      Strings.routeOurProgram,
      Strings.routeExpectedFoals
			);
   }

  ngOnInit(): void {

    this.route.url.subscribe(params => {
      this.setActiveView(params[0].path);
    })

    this.titleService.setTitle('Breeding American miniature horses in Ireland');

    this.metaService.updateTag({
      name: 'Description',
      content: `At Turra Lodge Farm we breed American miniature horses. These horses are registered with the American Miniature
      Horse Association (AMHA), some are also registered with the American Miniature Horse Registry (AMHR), the British
      Miniature Horse Society (BMHS) or the American Shetland Pony Club (ASPC). All of our horses: measure 34 inches or
      under; and, are DNA tested and parentage qualified.`});
  }

  private setActiveView(route: string) {

    route = this.routePrefix + route;
    
    if (route === Strings.routeTheMiniatureHorse) {

      this.title = Strings.titleTheMiniatureHorse;
      this.activeLink = Strings.routeTheMiniatureHorse;
    }
    else if (route === Strings.routeOurProgram) {

      this.title = Strings.titleOurProgram;
      this.activeLink = Strings.routeOurProgram;
    }
    else {
      this.title = Strings.titleExpectedFoals;
      this.activeLink = Strings.routeExpectedFoals;
    }
  }

}
