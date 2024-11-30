import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user/user';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `http://localhost:8080/api/v1/users`;
  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<User> {

    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

}
