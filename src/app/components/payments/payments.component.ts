import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AddressService} from '../../services/address/address.service';
import {OrderService} from '../../services/orders/order.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  list: any[] = []
  constructor(
    private addressService: AddressService,
    private orderService: OrderService
    ) {
  }

  ngOnInit() {
    this.getApiMap();
    console.log(this.list)
  }
  getApiMap(): void {
    this.addressService.getSuggestions(" 2855 quốc lộ 1a, Hồ chí minh  ").subscribe((data: any) => {
      this.getApiMap = data;
      data.forEach((item: any) => {
        console.log(item );

      })
      console.log(data);
    })
  }

  // Phương thức gửi dữ liệu đơn hàng
  createOrder() {
    const orderData = {
      shippingAddress: "456 Đường Lê Lai, Quận 1, TP. Hồ Chí Minh",
      phoneNumber: "0987654321",  // nhập trên form
      status: "PENDING",
      user: {id: 2},  // ID người dùng lấy từ khi đăng nhập
      orderDetails: [
        {quantity: 2, sku: {id: 1}},
        {quantity: 1, sku: {id: 2}}
      ]
    };

    // Gọi API tạo đơn hàng
    this.orderService.createOrder(orderData).subscribe(
      response => {
        console.log("Order created successfully", response);
      },
      error => {
        console.error("Error creating order", error);
      }
    );
  }

}
