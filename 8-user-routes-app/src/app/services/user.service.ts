import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: user[] = [{
    id: 1,
    name: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    password: 'password123'
  },
  {
    id: 2,
    name: 'Joseph',
    lastname: 'Smith',
    email: 'joseph.smith@example.com',
    username: 'josephsmith',
    password: 'password123'
  },
];

findAll(): Observable<user[]> {
  return of(this.users);
}

  constructor() { }
}
