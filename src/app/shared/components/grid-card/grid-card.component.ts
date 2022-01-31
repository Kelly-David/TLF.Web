import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss']
})
export class GridCardComponent implements OnInit, OnChanges {

  @Input() imageUrl!: string;

  private relativeUrlPrefix = "../../../../";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    this.imageUrl = this.relativeUrlPrefix + this.imageUrl;

    console.log(this.imageUrl);
  }

}
