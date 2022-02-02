import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { LightBoxClick } from '../models/web.models';

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

}
