import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../../models/web.models';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss']
})
export class GridCardComponent implements OnInit, OnChanges {

  @Input() image!: Image;
  @Input() useRelativeFilePath = false;
  @Output() imageClickEvent = new EventEmitter<string>();

  public imageUrl!: string;
  private relativeUrlPrefix = "../../../../";

  constructor(
    public viewService: ViewService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if (!this.useRelativeFilePath) {
      this.imageUrl = this.image.PathToFullImg;
    } else {
      this.imageUrl = this.relativeUrlPrefix + this.image.PathToFullImg;
    }
  }

  public clickEvent(): void {

    this.imageClickEvent.emit(this.image.Id);
  }

}
