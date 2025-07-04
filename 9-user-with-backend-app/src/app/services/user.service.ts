import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: user[] = [];

  private url: string = 'http://localhost:8080/api/users';

findAll(): Observable<user[]> {
  return this.http.get<user[]>(this.url);
}

findAllPageable(page: number): Observable<any> {
  return this.http.get<any>(`${this.url}/page/${page}`);
}

findById(id: number): Observable<user>{
  return this.http.get<user>(`${this.url}/${id}`);
}

create(user: user): Observable<user>{
  return this.http.post<user>(this.url, user);
}

update(user: user): Observable<user>{
  return this.http.put<user>(`${this.url}/${user.id}`, user);
}

delete(id: number): Observable<number>{
  return this.http.delete<number>(`${this.url}/${id}`).pipe(
    map(() => id)
  );
}

  constructor(private http: HttpClient) { }
}
