import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Strings } from 'src/app/shared/strings';
import { Image } from '../../shared/models/web.models';

@Component({
  selector: 'app-pygmy-goats',
  templateUrl: './pygmy-goats.component.html',
  styleUrls: ['./pygmy-goats.component.scss']
})
export class PygmyGoatsComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;

  public images!: Array<Image>;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {

    this.title = 'Pygmy Goats';
		this.activeLink = Strings.routePygmyGoats;

		this.routesToShow = new Array<string>(
			Strings.routeOurFarm,
			Strings.routePygmyGoats
			);
      
    this.images = [
      { Id: "1", PathToFullImg: '../../../assets/goats/5.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' },
      { Id: "2", PathToFullImg: '../../../assets/goats/hs_02.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' },
      { Id: "3", PathToFullImg: '../../../assets/goats/hs_01.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' },
      { Id: "4", PathToFullImg: '../../../assets/goats/hs_05.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' },
      { Id: "5", PathToFullImg: '../../../assets/goats/sold10.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' },
      { Id: "6", PathToFullImg: '../../../assets/goats/hs_06.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' },
      { Id: "7", PathToFullImg: '../../../assets/goats/ks_04.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' },
      { Id: "8", PathToFullImg: '../../../assets/goats/7.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' },
      { Id: "9", PathToFullImg: '../../../assets/goats/sold12.jpg', PathToThumbnail: '', Description: 'TLF Pygmy Goats', AltText: 'TLF Pygmy Goats' }
    ]
   }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({
      name: 'Description',
      content: `Pygmy Goats were the beginning of Turra Lodge Farm. We specialize in breeding conformationally correct goats suited
      to show-ring competition, in a variety of colour and patterns. Over the past decade TLF has carefully developed our
      distinct type of pygmy goat, a type that has become appreciated by many of Ireland's Pygmy Goat breeders. As a
      result, TLF Pygmy Goats and their descendants can be found throughout the pedigrees of many Irish Pygmy Goat farms
      today.`});
  }

}
