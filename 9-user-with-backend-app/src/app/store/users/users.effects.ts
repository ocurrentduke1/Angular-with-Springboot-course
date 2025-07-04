import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';
import { user } from '../../models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { add, addSuccess, findAllPageable, load, remove, removeSuccess, setErrors, update, updateSuccess } from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$;
  addUser$;
  addSuccess$;
  updateUser$;
  updateSuccess$;
  removeUser$;
  removeSuccess$;

  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router
  ) {
    this.loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(load),
        exhaustMap((action) =>
          this.service.findAllPageable(action.page).pipe(
            map((pageable) => {
              const users = pageable.content as user[];
              const paginator = pageable;

              return findAllPageable({ users, paginator });
            }),
            catchError((error) => of(error))
          )
        )
      )
    );

    this.addUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(add),
        exhaustMap((action) =>
          this.service.create(action.userNew).pipe(
            map(
              (userNew) => addSuccess({ userNew })
            ),
            catchError((error) =>
                error.status == 400
                  ? of(setErrors({ userForm:action.userNew, errors: error.error }))
                  : of(error)
              )
          )
        )
      )
    );

    this.addSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(addSuccess),
          tap(() => {
            this.router.navigate(['/users']);

            Swal.fire({
              title: 'Created!',
              text: 'User information has been created successfully.',
              icon: 'success',
            });
          })
        ),
      { dispatch: false }
    );

    this.updateUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(update),
        exhaustMap((action) =>
          this.service.update(action.userUpdated).pipe(
            map(
              (userUpdated) => updateSuccess({ userUpdated })
            ),
            catchError((error) =>
                error.status == 400
                  ? of(setErrors({ userForm:action.userUpdated, errors: error.error }))
                  : of(error)
              )
          )
        )
      )
    );

    this.updateSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(updateSuccess),
          tap(() => {
            this.router.navigate(['/users']);

            Swal.fire({
              title: 'Updated!',
              text: 'User information has been updated successfully.',
              icon: 'success',
            });
          })
        ),
      { dispatch: false }
    );

    this.removeUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(remove),
        exhaustMap((action) =>
          this.service.delete(action.id).pipe(
            map( () => removeSuccess({ id: action.id })
            )
          )
        )
      )
    );

    this.removeSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(removeSuccess),
          tap(() => {
            this.router.navigate(['/users']);

            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted.',
              icon: 'success',
            });
          })
        ),
      { dispatch: false }
    );
  }
}
