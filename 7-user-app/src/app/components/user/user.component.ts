import { Component, EventEmitter, Input, Output } from '@angular/core';
import { user } from '../../models/user';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {
  title: string = 'User Application';

  @Input() users: user[] = []
  

  @Output() idUserEventEmitter = new EventEmitter();
  @Output() selectedUserEventEmitter = new EventEmitter();

  onRemoveUser(id: number): void {
      this.idUserEventEmitter.emit(id);
  }

  onSelectUser(user: user): void {
    this.selectedUserEventEmitter.emit(user);
  }

}
