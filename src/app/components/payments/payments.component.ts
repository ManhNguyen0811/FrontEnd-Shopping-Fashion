import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AddressService} from '../../services/address/address.service';
import {OrderService} from '../../services/orders/order.service';
import {CurrencyPipe} from '@angular/common';
import {Order} from '../../model/order/order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {

  userId: number = 1; // Lấy userId từ nơi khác, ví dụ từ session, login, etc.
  order: Order | null = null;
  list: any[] = []
  totalPrice: number = 0
  totalQty: number = 0

  // orderForm: FormGroup;
  // shippingMethods = ['Giao tận nơi', 'Lấy tại cửa hàng'];
  // paymentMethods = ['Thanh toán khi nhận hàng', 'VNPay'];


  constructor(
    private addressService: AddressService,
    private orderService: OrderService,
    private router: ActivatedRoute,
    private route: Router
  ) {
  }




  ngOnInit() {
    this.router.params.subscribe(params => {
      this.totalPrice = +params['totalPrice']; // dấu + để chuyển đổi thành kiểu number
      this.totalQty = +params['totalQty'];

    });


    this.getApiMap();
    console.log(this.list)
  }

  getApiMap(): void {
    this.addressService.getSuggestions(" 2855 quốc lộ 1a, Hồ chí minh  ").subscribe((data: any) => {
      this.getApiMap = data;
      data.forEach((item: any) => {
        console.log(item);

      })
      console.log(data);
    })
  }

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
