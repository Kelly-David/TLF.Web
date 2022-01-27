import { Component, OnInit } from '@angular/core';
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

	constructor(
		private viewService: ViewService,
		private metaService: Meta,
		private titleService: Title) { }

	ngOnInit(): void {

		this.titleService.setTitle('Our Horses');

		this.metaService.updateTag({
			name: Strings.metaDataName,
			content: Strings.metaDataContent
		});

		this.viewService.SetViewTitle(this.title);
	}

	public filterHorseList(param: string) {
		this.filter = param;
	}

}