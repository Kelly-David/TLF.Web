import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ViewService } from '../../shared/services/view.service';
import { Strings } from '../../shared/strings';
import { HorseService } from '../../shared/services/horse.service';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	public pathToHeader = '../../../assets/image/layout/index-header.jpg' as string;
	public pathToThumbnails = '../../../assets/image/index/' as string;
	public featured$!: Observable<any>;

	images = [
		{ img: 'home12.jpg', thumb: 'home12.jpg', description: 'TLF Afire Affair', caption: '' },
		{ img: 'home10.jpg', thumb: 'home10.jpg', description: 'TLF My T Affair', caption: '' },
		{ img: 'home2.jpg', thumb: 'home2.jpg', description: 'Black Mountain Majestic Midnight', caption: '' },
		{ img: 'home11.jpg', thumb: 'home11.jpg', description: 'TLF Painted Affair', caption: '' },
		{ img: 'home5.jpg', thumb: 'home5.jpg', description: 'TLF Aspire Affair', caption: '' },
		{ img: 'home7.jpg', thumb: 'home7.jpg', description: 'Caluka UK Hearts Echo', caption: '' }
	];

	constructor(
		public viewService: ViewService,
		public titleService: Title,
		public metaService: Meta,
		public horseService: HorseService
	) { }

	ngOnInit() {

		this.titleService.setTitle('Home');

		this.metaService.updateTag({
			name: Strings.metaDataName,
			content: Strings.metaDataContent 
		});

		/// Hide the title
		this.viewService.SetViewTitle('');

		this.images.forEach(element => {
			element.img = this.pathToThumbnails + element.img;
			element.thumb = this.pathToThumbnails + element.thumb;
			element.caption = element.description;
		});
	}

}
