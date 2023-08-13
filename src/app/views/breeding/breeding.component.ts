import { Component, OnInit } from '@angular/core';
import { Strings } from 'src/app/shared/strings';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { HorseService } from '../../shared/services/horse.service';
import { Month, ExpectedFoals } from '../../shared/models/web.models';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-breeding',
  templateUrl: './breeding.component.html',
  styleUrls: ['./breeding.component.scss']
})
export class BreedingComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;
  public expectedFoals$!: Observable<ExpectedFoals>;
  public yearToDisplay!: number;

  private routePrefix = "breeding/"

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private horseService: HorseService,
    private configService: ConfigurationService
  ) {

    this.title = Strings.titleShowing;
		this.activeLink = Strings.routeShowing;

		this.routesToShow = new Array<string>(
			Strings.routeTheMiniatureHorse,
      Strings.routeOurProgram,
      Strings.routeExpectedFoals
			);
   }

  ngOnInit() {

    this.configService.config$.pipe(take(1)).subscribe(c => this.SetBreedingsToDisplay(c.BreedingYearToDisplay));

    this.route.url.subscribe(params => {
      this.setActiveView(params[0].path);
    });

    //this.expectedFoals$ = this.horseService.V1GetExpectedFoalsByYear('2023');

    this.titleService.setTitle('Breeding American miniature horses in Ireland');

    this.metaService.updateTag({
      name: 'Description',
      content: `At Turra Lodge Farm we breed American miniature horses. These horses are registered with the American Miniature
      Horse Association (AMHA), some are also registered with the American Miniature Horse Registry (AMHR), the British
      Miniature Horse Society (BMHS) or the American Shetland Pony Club (ASPC). All of our horses: measure 34 inches or
      under; and, are DNA tested and parentage qualified.`});
  }

  private SetBreedingsToDisplay(year: number): void {

    this.yearToDisplay = year;
    this.expectedFoals$ = this.horseService.V2GetExpectedFoalsByYear(year.toString());
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

  public GetMonthString(monthNumber: number): string {

    return Month[monthNumber];
  }

  public FetchHorseById(horseId: string) {
    console.log(horseId);
    //return this.horseService.V1GetHorseById(horseId);
  }

}
