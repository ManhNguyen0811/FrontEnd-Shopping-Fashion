import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../services/orders/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  userId: number = 1;
  order: any;

  constructor(private orderService: OrderService, private router: Router) {}


  createOrder() {
    this.orderService.createOrderFromCart(this.userId).subscribe(
      (response) => {
        this.order = response;
        console.log('Order created successfully', this.order);
        // Chuyển hướng hoặc thông báo cho người dùng sau khi tạo đơn hàng thành công
      },
      (error) => {
        console.error('There was an error!', error);
        // Xử lý lỗi nếu có
      }
    );
  }

}
