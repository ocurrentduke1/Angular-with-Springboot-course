import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserAppComponent implements OnInit {

  constructor(
    private shargingDataService: SharingDataService,
    private router: Router,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.handlerLogin();
  }

  handlerLogin() {
    this.shargingDataService.handleLoginEventEmitter.subscribe(
      ({ username, password }) => {
        console.log(username + ' ' + password);

        this.auth.loginUser({ username, password }).subscribe({
          next: (response) => {
            const token = response.token;
            const payload = this.auth.getpayload(token);

            const user = { username: payload.username };
            const login = { user, isAuth: true, isAdmin: payload.isAdmin };
            this.auth.user = login;
            this.auth.token = token;
            this.router.navigate(['/users/page/0']);
            console.log(payload);
          },
          error: (err) => {
            if (err.status === 401) {
              console.error('Login failed:', err);
              Swal.fire({
                title: 'Login Failed',
                text: err.error.message,
                icon: 'error',
              });
            } else {
              throw err;
            }
          },
        });
      }
    );
  }
}
