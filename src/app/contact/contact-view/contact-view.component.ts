import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Strings } from 'src/app/shared/strings';
import { ViewService } from '../../shared/services/view.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {

  public title!: string;
  public activeLink!: string;
  public routesToShow!: Array<string>;

  private subscription = new Subject();
  public links!: Array<any>;
  public clubs!: Observable<any>;
  public linkByCountry!: Array<{ country: string; links: Array<any>; }>;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private route: ActivatedRoute,
    private viewService: ViewService
  ) {
    this.title = Strings.titleContact;
    this.activeLink = Strings.routeContact;

    this.routesToShow = new Array<string>(
      Strings.routeContact,
      Strings.routeLinks
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

    this.clubs = (this.viewService.activeLinkCollection('club') as any);
    
    this.viewService.activeLinkCollection('farm').pipe(
      takeUntil(this.subscription),
      filter(data => !!data)
    ).subscribe(data => {
      this.links = data as Array<any>;
      const countries = (Array.from(new Set(this.links.map(item => item.location)))).sort();
      this.linkByCountry = [];
      countries.forEach(country => {
        this.linkByCountry.push(
          {
            country: country,
            links: this.links.filter(link => link.location.toUpperCase() === country.toUpperCase()).sort()
          }
        );
      });
    });
  }

  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
  }

  private setActiveView(route: string) {

    if (route === Strings.routeContact) {

      this.title = Strings.titleContact;
      this.activeLink = Strings.routeContact;
    }
    else {
      this.title = Strings.titleLinks;
      this.activeLink = Strings.titleLinks;
    }
  }

}
