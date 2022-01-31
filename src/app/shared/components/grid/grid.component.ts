import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Image } from '../../models/web.models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {

  @Input() imagesContent!: Image[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {

  }

}
