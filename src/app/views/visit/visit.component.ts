import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/shared/models/web.models';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

  images = [
		{ Id: '1', PathToThumbnail: '../../../assets/images/ollie.jpg', PathToFullImg: '../../../assets/images/ollie.jpg', Description: 'Ollie, Mojo and Lemon', AltText: 'Turra Lodge Farm' },
		{ Id: '5', PathToThumbnail: '../../../assets/images/lake.jpg', PathToFullImg: '../../../assets/images/lake.jpg', Description: 'The lake at Turra Lodge Farm', AltText: 'Turra Lodge Farm' },
		{ Id: '9', PathToThumbnail: '../../../assets/images/luther.jpg', PathToFullImg: '../../../assets/images/luther.jpg', Description: 'Caluka UK Hearts Echo', AltText: 'Turra Lodge Farm' }
	] as Image[];

  constructor() { }

  ngOnInit(): void {

    this.title = "Visit";
  }

}
