import { Component, EventEmitter, OnInit, } from '@angular/core';
import { user } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  title: string = 'User Application';

  users: user[] = []
  
  constructor(private router: Router, private service: UserService,private sharingDataService: SharingDataService) { }
  ngOnInit(): void {
    this.service.findAll().subscribe((users) => this.users = users)
  }

  idUserEventEmitter = new EventEmitter();
  selectedUserEventEmitter = new EventEmitter();

  onRemoveUser(id: number): void {
      this.sharingDataService.idUserEventEmitter.emit(id);
  }

  onSelectUser(user: user): void {
    this.router.navigate(['/users/edit', user.id]);
  }

}
