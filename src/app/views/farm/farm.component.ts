import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Image } from '../../shared/models/web.models';
import { Strings } from '../../shared/strings';

@Component({
	selector: 'app-farm',
	templateUrl: './farm.component.html',
	styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {

	public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

	images = [
		{ Id: '0', PathToThumbnail: '../../../assets/images/lottie.jpg', PathToFullImg: '../../../assets/images/lottie.jpg', Description: 'LV Roadmasters Sir Lancelot', AltText: 'Turra Lodge Farm' },
		{ Id: '1', PathToThumbnail: '../../../assets/images/ollie.jpg', PathToFullImg: '../../../assets/images/ollie.jpg', Description: 'Ollie, Mojo and Lemon', AltText: 'Turra Lodge Farm' },
		{ Id: '3', PathToThumbnail: '../../../assets/images/boys.jpg', PathToFullImg: '../../../assets/images/boys.jpg', Description: 'Mojo and Lemon', AltText: 'Turra Lodge Farm' },
		{ Id: '4', PathToThumbnail: '../../../assets/images/fire.jpg', PathToFullImg: '../../../assets/images/fire.jpg', Description: 'TLF Afire Affair', AltText: 'Turra Lodge Farm' },
		{ Id: '5', PathToThumbnail: '../../../assets/images/lake.jpg', PathToFullImg: '../../../assets/images/lake.jpg', Description: 'The lake at Turra Lodge Farm', AltText: 'Turra Lodge Farm' },
		{ Id: '6', PathToThumbnail: '../../../assets/images/juno.jpg', PathToFullImg: '../../../assets/images/juno.jpg', Description: 'TLF Painted Affair', AltText: 'Turra Lodge Farm' },
		{ Id: '7', PathToThumbnail: '../../../assets/images/lake2.jpg', PathToFullImg: '../../../assets/images/lake2.jpg', Description: 'Turra Lodge Farm', AltText: 'Turra Lodge Farm' },
		{ Id: '8', PathToThumbnail: '../../../assets/images/lemon.jpg', PathToFullImg: '../../../assets/images/lemon.jpg', Description: 'Mojo and Lemon', AltText: 'Turra Lodge Farm' },
		{ Id: '9', PathToThumbnail: '../../../assets/images/luther.jpg', PathToFullImg: '../../../assets/images/luther.jpg', Description: 'Caluka UK Hearts Echo', AltText: 'Turra Lodge Farm' }
	] as Image[];

	constructor(
		private metaService: Meta,
		private titleService: Title
	) {
		this.title = 'Our Farm';
		this.activeLink = Strings.routeOurFarm;

		this.routesToShow = new Array<string>(
			Strings.routeOurFarm,
			Strings.routePygmyGoats
			);
	 }

	ngOnInit() {
		this.titleService.setTitle(this.title);

		this.metaService.updateTag({
			name: 'Description',
			content: `Turra Lodge Farm is a family owned and operated American miniature horse breeding program
      located in the south east of Ireland.
      The Kelly Family have owned and bred miniature horses since 2005. The farm is home to a small
      group of AMHA registered miniature horses, some of which are also registered with the AMHR or
      the BMHS.`});
	}

}
