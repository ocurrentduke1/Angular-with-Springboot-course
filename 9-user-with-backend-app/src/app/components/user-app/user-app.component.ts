import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserAppComponent implements OnInit {
  users: user[] = [];

  constructor(
    private service: UserService,
    private shargingDataService: SharingDataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.service.findAll().subscribe((users) => (this.users = users));
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    this.shargingDataService.findUserEventEmitter.subscribe((id) => {
      const user = this.users.find((u) => u.id === id);
      this.shargingDataService.selectedUserEventEmitter.emit(user);
    });
  }

  addUser() {
    this.shargingDataService.newUserEventEmitter.subscribe((User) => {
      if (User.id > 0) {
        this.service.update(User).subscribe((userUpdated) => {
          this.users = this.users.map((u) =>
            u.id == userUpdated.id ? { ...userUpdated } : u
          );
          this.router.navigate(['/users']);
        });
      } else {
        this.service.create(User).subscribe((userNew) => {
          console.log(userNew);
          this.users = [...this.users, { ...userNew }];
          this.router.navigate(['/users']);
        });
      }

      Swal.fire({
        title: 'Saved!',
        text: 'User information has been saved successfully.',
        icon: 'success',
      });
    });
  }

  removeUser(): void {
    this.shargingDataService.idUserEventEmitter.subscribe((id) => {
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
          this.service.delete(id).subscribe(() => {
            this.users = this.users.filter((user) => user.id !== id);
            this.router
              .navigate(['/users/Create'], { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/users'], {
                  state: { users: this.users },
                });
              });
          });
          Swal.fire({
            title: 'Deleted!',
            text: 'User has been deleted.',
            icon: 'success',
          });
        }
      });
    });
  }
}
