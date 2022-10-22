import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormEvent, ListItem, FormEventType } from '../../../models/web.models';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnChanges {

  @Input() item!: ListItem
  @Output() changes;

  constructor() { 
    this.changes = new EventEmitter<FormEvent>();
  }

  ngOnChanges(): void {
  }

  public Delete(item: ListItem) {

    if (confirm("Confirm delete")) {

      this.changes.emit({ Type: FormEventType.Delete, Item: this.item });
    }
  }

}
