import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { HorseService } from 'src/app/shared/services/horse.service';
import { ViewService } from '../../shared/services/view.service';

@Component({
	selector: 'app-horse-route',
	templateUrl: './horse-route.component.html',
	styleUrls: ['./horse-route.component.scss']
})
export class HorseRouteComponent implements OnInit, OnDestroy {

	public route!: string;
	public horse$!: Observable<any>;
	public navigationSubscription;
	public title = 'Our Horses' as string;

	constructor(
		private horseService: HorseService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private viewService: ViewService
	) {
		// subscribe to the router events - storing the subscription so
		// we can unsubscribe later.
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			// If it is a NavigationEnd event re-initalise the component
			if (e instanceof NavigationEnd) {
				this.loadData();
			}
		});
	}

	ngOnInit() {
		this.viewService.SetViewTitle(this.title);
	}

	loadData() {
		this.route = this.activatedRoute.snapshot.params['route'];
		this.horse$ = this.horseService.V1GetHorseIdByRoute(this.route);
	}

	ngOnDestroy() {
		// avoid memory leaks here by cleaning up after ourselves. If we
		// don't then we will continue to run our initialiseInvites()
		// method on every navigationEnd event.
		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}

	public routeToName(route: string) {
		return route.replace(/-/g, ' ').toUpperCase();
	}
}
