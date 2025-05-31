import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  @Input() items: CartItem[] = [];
}
