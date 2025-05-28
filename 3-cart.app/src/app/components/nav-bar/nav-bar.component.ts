import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  @Input() items: CartItem[] = [];
  @Output() openEventEmitter = new EventEmitter();

  openCart(): void {
    this.openEventEmitter.emit();
  }
}
