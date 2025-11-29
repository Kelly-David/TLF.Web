import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ViewService } from 'src/app/shared/services/view.service';
import { Strings } from 'src/app/shared/strings';

@Component({
	selector: 'app-horses',
	templateUrl: './horses.component.html',
	styleUrls: ['./horses.component.scss']
})
export class HorsesComponent implements OnInit {

 	public filter = 'breeding' as string;
 	public title = 'Our Horses' as string;

	// session storage key for remembering the selected filter
	private readonly FILTER_KEY = 'horses.filter';

	constructor(
		private viewService: ViewService,
		private metaService: Meta,
		private titleService: Title,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit(): void {

		// If navigation requested a reset (via query param or history state), clear the stored filter
		const qp = this.route.snapshot.queryParams || {};
		const historyState = (window && (window as any).history && (window as any).history.state) || {};
		if (qp.resetFilter === '1' || qp.resetFilter === 'true' || historyState.resetFilter === true) {
			this.resetFilter();
		} else {
			// restore previously selected filter (if any)
			try {
				const saved = sessionStorage.getItem(this.FILTER_KEY);
				if (saved) this.filter = saved;
			} catch (err) {
				// ignore sessionStorage errors
			}
		}

		this.titleService.setTitle('Our Horses');

		this.metaService.updateTag({
			name: Strings.metaDataName,
			content: Strings.metaDataContent
		});

		this.viewService.SetViewTitle(this.title);
	}

	public filterHorseList(param: string) {
 		this.filter = param;
 		try { sessionStorage.setItem(this.FILTER_KEY, param); } catch (err) { }
 	}

	/**
	 * Reset the saved filter and set to default.
	 */
	private resetFilter() {
		try { sessionStorage.removeItem(this.FILTER_KEY); } catch (err) { }
		this.filter = 'breeding';
	}

}