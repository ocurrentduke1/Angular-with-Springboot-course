import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { user } from '../../models/user';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  @Input() user!: user;

  @Output() newUserEventEmitter = new EventEmitter<user>();
  @Output() enableEventEmitter = new EventEmitter<void>();

  constructor(){
    this.user = new user();
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
    console.log('User Form Submitted', this.user);
    this.newUserEventEmitter.emit(this.user);
  }
  userForm.resetForm();
  userForm.reset();
  }

  onClear(userForm: NgForm): void{
    this.user = new user();
    userForm.resetForm();
    userForm.reset();
  }

  onEnable(): void {
    this.enableEventEmitter.emit();
  }
}
