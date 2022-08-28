import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ViewService } from '../../shared/services/view.service';
import { Strings } from '../../shared/strings';
import { HorseService } from '../../shared/services/horse.service';
import { filter } from 'rxjs/operators';
import { Image } from '../../shared/models/web.models';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	public pathToHeader = '../../../assets/layout/index-header.jpg' as string;
	public pathToThumbnails = 'assets/images/' as string;
	public featured$!: Observable<any>;
	public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

	images = [
		{Id: "01", PathToFullImg: 'home12.jpg', PathToThumbnail: 'home12.jpg', Description: 'TLF Afire Affair', AltText: '' },
		{Id: "02", PathToFullImg: 'home10.jpg', PathToThumbnail: 'home10.jpg', Description: 'TLF My T Affair', AltText: '' },
		{Id: "03", PathToFullImg: 'home2.jpg', PathToThumbnail: 'home2.jpg', Description: 'Black Mountain Majestic Midnight', AltText: '' },
		{Id: "04", PathToFullImg: 'home11.jpg', PathToThumbnail: 'home11.jpg', Description: 'TLF Painted Affair', AltText: '' },
		{Id: "05", PathToFullImg: 'home5.jpg', PathToThumbnail: 'home5.jpg', Description: 'TLF Aspire Affair', AltText: '' },
		{Id: "06", PathToFullImg: 'home7.jpg', PathToThumbnail: 'home7.jpg', Description: 'Caluka UK Hearts Echo', AltText: '' }
	] as Image[];

	constructor(
		public viewService: ViewService,
		public titleService: Title,
		public metaService: Meta,
		public horseService: HorseService
	) {
		this.title = Strings.titleIndex;
		this.activeLink = Strings.routeVisit;

		this.routesToShow = new Array<string>(
			Strings.routeVisit			
			);
	 }

	ngOnInit() {

		this.titleService.setTitle('Home');
 
		this.metaService.updateTag({
			name: Strings.metaDataName,
			content: Strings.metaDataContent 
		});

		/// Hide the title
		this.viewService.SetViewTitle('');

		this.images.forEach(element => {
			element.PathToFullImg = this.pathToThumbnails + element.PathToFullImg;
			element.PathToThumbnail = this.pathToThumbnails + element.PathToThumbnail;
			element.AltText = element.Description;
		});
	}

}
