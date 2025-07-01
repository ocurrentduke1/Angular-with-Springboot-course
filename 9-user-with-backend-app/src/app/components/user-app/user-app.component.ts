import { Component, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
  users: user[] = [];
  paginator: any = {};

  constructor(
    private service: UserService,
    private shargingDataService: SharingDataService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    // this.service.findAll().subscribe((users) => (this.users = users));
    // this.route.paramMap.subscribe((params) => {
    //   const page: number = +(params.get('page' ) || '0');
    //   console.log(page);
    //   this.service.findAllPageable(page).subscribe((pageable) => (this.users = pageable.content as user[]));
    // })
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }

  pageUsersEvent() {
    this.shargingDataService.pageUsersEventEmitter.subscribe((pageable) => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    });
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
        this.service.update(User).subscribe({
          next: (userUpdated) => {
            this.users = this.users.map((u) =>
              u.id == userUpdated.id ? { ...userUpdated } : u
            );
            this.router.navigate(['/users'], {
              state: { users: this.users, paginator: this.paginator },
            });

            Swal.fire({
              title: 'Updated!',
              text: 'User information has been updated successfully.',
              icon: 'success',
            });
          },
          error: (err) => {
            if (err.status == 400) {
              this.shargingDataService.errorsUserFormEventEmitter.emit(
                err.error
              );
            }
          },
        });
      } else {
        this.service.create(User).subscribe({
          next: (userNew) => {
            console.log(userNew);
            this.users = [...this.users, { ...userNew }];
            this.router.navigate(['/users'], {
              state: { users: this.users, paginator: this.paginator },
            });

            Swal.fire({
              title: 'Created!',
              text: 'User information has been created successfully.',
              icon: 'success',
            });
          },
          error: (err) => {
            if (err.status == 400) {
              this.shargingDataService.errorsUserFormEventEmitter.emit(
                err.error
              );
            }
          },
        });
      }
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
                  state: { users: this.users, paginator: this.paginator },
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

  handlerLogin() {
    this.shargingDataService.handleLoginEventEmitter.subscribe(
      ({ username, password }) => {
        console.log(username + ' ' + password);

        this.auth.loginUser({ username, password }).subscribe({
          next: (response) => {
            const token = response.token;
            console.log(token);
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
