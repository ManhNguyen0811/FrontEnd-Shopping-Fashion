import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';

import {CartResponse} from '../../model/cart/CartResponse';
import {firstValueFrom, Observable} from 'rxjs';
import {CartItem} from '../../model/cart/CartItem';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CartDTO} from '../../model/cart/CartDTO';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  userID : number  = 1


  showSuccessMessage: boolean = false;
  message: string = ""
  totalPrice : number = 0;
  totalQty : number = 0;
  listCartResponse? : CartResponse;
  listCartItem? : CartItem[];
  constructor(private cartService: CartService,  private router: Router,

              ) {
  }


  ngOnInit() {
    this.loadCart(this.userID)
    console.log(this.listCartItem)
  }



  updateQty(cartId: number, qty: number) {


    // Gọi dịch vụ để cập nhật số lượng giỏ hàng
    this.cartService.updateQty(cartId, qty).subscribe({
      next: () => {
        // Sau khi cập nhật số lượng, lấy lại thông tin tổng số item trong giỏ hàng
        this.cartService.getTotalItemUrl(this.userID).subscribe({
          next: (data) => {
            // Xử lý dữ liệu trả về nếu cần
            console.log("Cập nhật giỏ hàng thành công", data);
          },
          error: (err) => {
            console.error("Lỗi khi lấy tổng số item trong giỏ hàng", err);
          }
        });
      },
      error: (err) => {
        console.error("Lỗi khi cập nhật số lượng sản phẩm", err);
      }
    });
  }



  loadCart(userid: number): void {
    this.totalPrice = 0;
    this.totalQty = 0;

    this.cartService.getDataCart(userid).subscribe((dataCart: CartResponse) => {
      this.listCartResponse = dataCart;
      this.listCartItem = dataCart.cartItem;

      dataCart.cartItem.forEach(item => {
        this.totalPrice += item.price * item.quantity;
        this.totalQty += item.quantity;
      });
    });
  }

  activeMinus(cartItem: { quantity: number, id : number }) {

    if (cartItem.quantity == 1) {
      cartItem.quantity--;
      this.updateQty(cartItem.id,cartItem.quantity);
      window.location.reload()
    }else{
      cartItem.quantity--;
      this.updateQty(cartItem.id,cartItem.quantity);

    }
  }
  activeAdd(cartItem: { quantity: number, id : number }) {
    cartItem.quantity++; // Increase quantity
    this.updateQty(cartItem.id,cartItem.quantity);

  }



}
