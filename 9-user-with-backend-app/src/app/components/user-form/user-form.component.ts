import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { user } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { add, find, resetUser, update } from '../../store/users/users.actions';

@Component({
  selector: 'user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  user: user;
  errors: any = {};

  constructor(
    private route: ActivatedRoute,
    private store: Store<{users: any}>,
  ) {
    this.user = new user();

    this.store.select('users').subscribe(state => {
      this.errors = state.errors;
      this.user = {... state.user};
    });
  }

  ngOnInit(): void {
    // this.sharingDataService.selectedUserEventEmitter.subscribe((user) => this.user = user);
    // this.sharingDataService.errorsUserFormEventEmitter.subscribe((errors) => {
    //   this.errors = errors; });
    this.store.dispatch(resetUser());
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.store.dispatch(find({id}));
      }
    })
  }

  onSubmit(userForm: NgForm): void {
    if(this.user.id > 0){
      this.store.dispatch(update({userUpdated: this.user}))
    }else{
      this.store.dispatch(add({userNew: this.user}))
    }
    
  }

  onClear(userForm: NgForm): void{
    this.store.dispatch(resetUser());
    userForm.resetForm();
    userForm.reset();
  }

}
