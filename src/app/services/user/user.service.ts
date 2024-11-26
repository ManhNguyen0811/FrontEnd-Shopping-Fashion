import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = `${environment.apiUrl}/api/v1/users`;
  constructor(private http: HttpClient) { }

  // getUserProfile(): Observable<User> {
  //   // Ví dụ: Lấy thông tin người dùng từ backend (đảm bảo API phù hợp)
  //   return this.http.get<User>(`${this.apiUrl}/profile`);
  // }

}
