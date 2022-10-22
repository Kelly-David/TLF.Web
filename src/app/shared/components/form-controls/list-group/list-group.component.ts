import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ListItem, FormEvent } from '../../../models/web.models';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent implements OnChanges {

  @Input() title!: string;
  @Input() items = [] as Array<ListItem>;
  @Input() source = [] as Array<ListItem>;
  public selectItems = [] as Array<ListItem>;
  @Output() changes;
  public selected: string | undefined;

  constructor() {
    this.changes = new EventEmitter<FormEvent>();
  }

  ngOnChanges(): void {

    // Set the Id and Value fields of the items (because we only store the Id in the db)
    this.items.forEach(item => {

      let sourceItem = this.source.find(element => element.Id == item.Id);

      if (sourceItem != null) {
        item.Id = sourceItem.Id;
        item.Value = sourceItem.Value;
      }
    });

    // Remove the existing items from the source array - so we can't select an exisiting one twice
    this.SetAvailableSelectItems();
  }

  public AddSelectedItem(item: ListItem) {
    if (item?.Id && item?.Value) {
      this.items.push(item);
      this.SetAvailableSelectItems();
    }
  }

  public RemoveItem(item: ListItem) {
    this.items = this.items.filter(i => i.Id != item.Id);
  }

  private SetAvailableSelectItems() {
    this.selectItems = this.source.filter(item => (this.items.find(i => i.Id == item.Id) == null));
  }

  public ListItemChanges(event: FormEvent) {
    this.items = this.items.filter(item => item.Id != event.Item.Id);
    this.SetAvailableSelectItems();
  }
}
