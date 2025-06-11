import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { user } from '../../models/user';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() users: user[] = [];
}
