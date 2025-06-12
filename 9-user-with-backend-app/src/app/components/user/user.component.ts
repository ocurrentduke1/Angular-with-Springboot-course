import { Component, EventEmitter, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'user',
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  title: string = 'User Application';

  users: user[] = [];
  paginator: any = {};
  pageUrl: string = '/users/page';

  constructor(
    private router: Router,
    private service: UserService,
    private sharingDataService: SharingDataService,
    private route: ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }
  ngOnInit(): void {
    if (
      this.users.length == 0 ||
      this.users == undefined ||
      this.users == null
    ) {
      // this.service.findAll().subscribe((users) => this.users = users)
      this.route.paramMap.subscribe((params) => {
        const page: number = +(params.get('page') || '0');
        console.log(page);
        this.service.findAllPageable(page).subscribe((pageable) => {
          this.users = pageable.content as user[];
          this.paginator = pageable;
          this.sharingDataService.pageUsersEventEmitter.emit({
            users: this.users,
            paginator: this.paginator,
          });
        });
      });
    }
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
