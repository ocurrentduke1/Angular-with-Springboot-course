import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../../models/user';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  user: user;

  constructor(private store: Store) {
    this.user = new user();
  }

  onsubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire({
        title: 'error de validacion',
        text: 'El usuario y la contraseña son obligatorios',
        icon: 'error',
      });
    } else {
      this.store.dispatch(login({ username: this.user.username, password: this.user.password }));
    }
  }
}
