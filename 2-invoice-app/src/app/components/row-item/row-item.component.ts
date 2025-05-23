import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'tr[row-item]',
  imports: [],
  templateUrl: './row-item.component.html'
})
export class RowItemComponent {

  @Input() item!: Item;
  @Output() removeEventEmiter: EventEmitter<number> = new EventEmitter();

  onRemove(id: number) {
    this.removeEventEmiter.emit(id);
  }
}
