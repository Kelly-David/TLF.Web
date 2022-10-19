import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListItem, FormEvent, FormEventType } from '../../../models/web.models';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnChanges {

  @Input() item!: ListItem;
  @Output() changes;

  public form: FormGroup

  constructor(private fromBuilder: FormBuilder) {

    this.changes = new EventEmitter<FormEvent>();

    this.form = this.fromBuilder.group({
      'FormControl': ['', []]
    });
  }

  ngOnChanges(): void {

    if (this.item != undefined) {
      this.form.patchValue({
        FormControl: this.item.Value
      });
    }
  }

  public Update() {

    this.item.Value = this.form.get('FormControl')?.value;

    this.changes.emit({ Type: FormEventType.Update, Item: this.item });
  }

  public Delete() {

    if (confirm("Confirm delete")) {

      this.item.Value = this.form.get('FormControl')?.value;

      this.changes.emit({ Type: FormEventType.Delete, Item: this.item });
    }
  }
}
