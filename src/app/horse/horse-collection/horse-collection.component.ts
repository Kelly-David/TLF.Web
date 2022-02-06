import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HorseService } from 'src/app/shared/services/horse.service';
import { ViewService } from '../../shared/services/view.service';
import { Strings } from '../../shared/strings';

@Component({
	selector: 'app-horse-collection',
	templateUrl: './horse-collection.component.html',
	styleUrls: ['./horse-collection.component.scss']
})
export class HorseCollectionComponent implements OnChanges {

	@Input() term!: string;
	@Input() selector = '' as string;

	horse = {
		state: true
	};

	public horses$!: Observable<any[]>;

	constructor(
		private horseService: HorseService
	) { }

	ngOnChanges() {
		if (this.term === 'foal') {

			this.horses$ = this.horseService.V1GetHorsesByFilterType(this.term, 'year', 'desc');
		} else {

			this.horses$ = this.horseService.V1GetHorsesByFilterType(this.term, 'name');
		}
	}
}
