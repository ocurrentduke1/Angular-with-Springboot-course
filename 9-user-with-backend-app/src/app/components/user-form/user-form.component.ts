import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { user } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  user!: user;

  constructor(private sharingDataService: SharingDataService, private route: ActivatedRoute, private service: UserService) {
    this.user = new user();
  }

  ngOnInit(): void {
    // this.sharingDataService.selectedUserEventEmitter.subscribe((user) => this.user = user);

    this.route.paramMap.subscribe(params => {
      const userId: number = +(params.get('id') || '0');
      if (userId > 0) {
        this.service.findById(userId).subscribe((user) => this.user = user);
        // this.sharingDataService.findUserEventEmitter.emit(userId);
      }
    })
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
    console.log('User Form Submitted', this.user);
    this.sharingDataService.newUserEventEmitter.emit(this.user);
  }
  userForm.resetForm();
  userForm.reset();
  }

  onClear(userForm: NgForm): void{
    this.user = new user();
    userForm.resetForm();
    userForm.reset();
  }

}
