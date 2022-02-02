import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../../models/web.models';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss']
})
export class GridCardComponent implements OnInit, OnChanges {

  @Input() image!: Image;
  @Output() imageClickEvent = new EventEmitter<string>();

  public imageUrl!: string;
  private relativeUrlPrefix = "../../../../";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    this.imageUrl = this.relativeUrlPrefix + this.image.PathToFullImg;
  }

  public clickEvent(): void {
    
    this.imageClickEvent.emit(this.image.Id);
  }

}
