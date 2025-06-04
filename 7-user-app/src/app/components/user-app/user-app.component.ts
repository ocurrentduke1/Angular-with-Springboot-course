import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserAppComponent implements OnInit {
  title: string = 'User Application';

  users: user[] = [];
  userSelected: user;
  enabled: boolean = false;

  constructor(private service: UserService) {
    this.userSelected = new user();
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((users) => (this.users = users));
  }

  addUser(User: user) {
    if (User.id > 0) {
      this.users = this.users.map((u) => (u.id === User.id ? { ...User } : u));
    } else {
      this.users = [...this.users, { ...User, id: new Date().getTime() }];
    }
    Swal.fire({
      title: 'Saved!',
      text: 'User information has been saved successfully.',
      icon: 'success',
    });
    this.userSelected = new user();
    this.enabled = false;
  }

  removeUser(id: number): void {
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
        this.users = this.users.filter((user) => user.id !== id);
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  setSelectedUser(userRow: user): void {
    this.userSelected = { ...userRow };
    this.enabled = true;
  }

  setEnabled(): void {
    this.enabled = !this.enabled;
  }

}
