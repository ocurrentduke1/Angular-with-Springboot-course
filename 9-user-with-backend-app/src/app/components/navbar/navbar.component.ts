import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { user } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private authservice: AuthService, private router: Router){}

  get login(){
    return this.authservice.user;
  }

  get admin(){
    return this.authservice.isAdmin();
  }

  handleLogout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
} 
