import { Component, EventEmitter, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private sharingDataService: SharingDataService,
    private store: Store<{ items: ItemsState }>
  ) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
      this.total = state.total;
    });
  }


  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
