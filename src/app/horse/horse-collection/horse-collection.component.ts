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
export class HorseCollectionComponent implements OnChanges, OnInit {

	@Input() term!: string;
	@Input() selector = '' as string;

	horse = {
		state: true
	};

	public horses$!: Observable<any[]>;

	constructor(
		private horseService: HorseService
	) { }

	ngOnInit() {

		//this.horseService.Migrate();


	}

	// mer(horse: any) {

	// 	const foals = this.horseService.V1GetProgenyByParentId(horse.id);

	// 	foals.pipe(take(1)).subscribe((data) => {
	// 		if (data !== undefined && data.length > 0) {
	// 			console.log(data);

	// 			if (horse.progeny === undefined) {

	// 				horse.progeny = data;
	// 				this.horseService.updateHorse(horse.id, horse);
	// 				console.log('Merged: ' + horse.name);
	// 			}
	// 		}
	// 	})
	// }

	ngOnChanges() {
		if (this.term === 'foal') {

			this.horses$ = this.horseService.V1GetHorsesByFilterType(this.term, 'year', 'desc');
		} else {

			this.horses$ = this.horseService.V1GetHorsesByFilterType(this.term, 'name');
		}
	}
}
