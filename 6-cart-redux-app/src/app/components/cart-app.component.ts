import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.actions';

@Component({
  selector: 'cart-app',
  imports: [NavBarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  constructor(
    private store: Store<{items: ItemsState}>,
    private sharingDataServie: SharingDataService,
    private router: Router
  ) {
    this.store.select('items').subscribe((state) =>{
      this.items = state.items;
      this.saveSession();
    })
  }

  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataServie.productEventEmitter.subscribe((product) => {
      this.store.dispatch(add({product: product}));
      this.store.dispatch(total());
      this.router.navigate(['/cart']);

      Swal.fire({
        title: 'Shoppimg cart',
        text: 'Product added to cart',
        icon: 'success',
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataServie.idProductEventEmitter.subscribe((id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({id: id}));
          this.store.dispatch(total());

          this.router.navigate(['/cart']);

          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      });
    });
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
