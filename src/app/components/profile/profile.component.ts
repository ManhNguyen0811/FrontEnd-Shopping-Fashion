import { Component } from '@angular/core';
import {User} from '../../model/user/user';
import {UserService} from '../../services/user/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: User | null = null;  // Biến lưu trữ thông tin người dùng
  // orders: Order[] = [];
  constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   this.loadUserProfile();  // Gọi hàm tải thông tin hồ sơ người dùng
  // }


  // loadUserProfile(): void {
  //   this.userService.getUserProfile().subscribe(
  //     (data: User) => {
  //       this.user = data;  // Lưu thông tin người dùng
  //     },
  //     error => {
  //       console.error('Error loading user profile', error);
  //     }
  //   );
  // }
}
