import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { LightBoxClick } from '../models/web.models';
import { filter } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ViewService {

	private titleSource = new BehaviorSubject('');
	public currentTitle = this.titleSource.asObservable();

	private lightboxDirection = new BehaviorSubject({} as LightBoxClick);
	public lightboxClick = this.lightboxDirection.asObservable();

	constructor(
		private domSanitizer: DomSanitizer,
		private firestore: FirestoreService
	) { }


	public GetStyleForImageAsBackground(imageUrl: any) {

		let style = `background-image: url(${imageUrl}) !important; background-size: cover; background-position: center`;

		return this.domSanitizer.bypassSecurityTrustStyle(style);
	}

	public SetViewTitle(message: string) {

		this.titleSource.next(message);
	}

	public GetSystemData(view: string) {

		return this.firestore.doc$(`system/${view}`);
	}

	public emitLightboxControlClick(event: LightBoxClick) {

		return this.lightboxDirection.next(event);
	}

	public activeLinkCollection(filter: string) {

		return this.firestore.col$(`link`, ref => ref
			.where('type', '==', filter.toUpperCase())
			.where('active', '==', true)
			.orderBy('description'));
	}

	public updateLinks() {

		let links;

		this.firestore.col$(`link`, ref => ref
			//.where('type', '==', 'FARM')
			//.where('active', '==', true)
			.orderBy('description')).pipe(filter(data => !!data)).subscribe(data => {
				links = data as Array<any>;

				links.forEach(element => {

					let types = [] as Array<string>;

					if (element.location == "Denmark") {

						types.push('AMHA');
					}

					if (element.location == "France") {

						types.push('AMHA');
						types.push('AMHR');
					}

					if (element.location == "UK") {

						types.push('AMHA');
						types.push('AMHR');
					}

					if (element.location == "USA") {

						types.push('AMHA');
						types.push('AMHR');
					}

					if (element.location == "Austria") {

						types.push('AMHA');
						types.push('AMHR');
					}

					if (element.location == "Czechia") {

						types.push('AMHA');
						types.push('AMHR');
					}

					if (element.location == "Sweden") {

						types.push('AMHA');
						types.push('AMHR');
					}

					if (element.location == "Germany") {

						types.push('AMHA');
						types.push('AMHR');
					}

					element.breeds = types;

					element.type = 'FARM';

					this.firestore.update('link', element.id, element);

					console.log(element);
				});
			})

	}

}
