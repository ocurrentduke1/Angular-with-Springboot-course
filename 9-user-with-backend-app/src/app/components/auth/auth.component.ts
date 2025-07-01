import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  user: user;

  constructor(private sharingData: SharingDataService){
    this.user = new user();
  }

  onsubmit() {
    if(!this.user.username || !this.user.password){
      Swal.fire({
        title: "error de validacion",
        text: "El usuario y la contraseña son obligatorios",
        icon: "error"
      });
    } else{
      this.sharingData.handleLoginEventEmitter.emit({username: this.user.username, password: this.user.password});
    }
  }
}
