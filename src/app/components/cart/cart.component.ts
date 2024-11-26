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
  showSuccessMessage: boolean = false;
  message: string = ""
  totalPrice : number = 0;
  totalQty : number = 0;
  listCartResponse? : CartResponse;
  listCartItem? : CartItem[];
  constructor(private cartService: CartService,  private router: Router) {
  }


  ngOnInit() {
    this.loadCart(2)


  }



  updateQty(cartId: number, qty: number) {
    console.log("cartId: "+ cartId)
    console.log("qty: "+ qty)
    this.cartService.updateQty(cartId, qty).subscribe(()=>{
      window.location.reload()
    });
  }


  loadCart(userid: number): void {
    this.totalPrice = 0; // Reset giá trị tổng tiền
    this.totalQty = 0;   // Reset giá trị tổng số lượng

    this.cartService.getDataCart(userid).subscribe((dataCart: CartResponse) => {
      this.listCartResponse = dataCart;
      this.listCartItem = dataCart.cartItem;

      dataCart.cartItem.forEach(item => {
        this.totalPrice += item.price * item.quantity;
        this.totalQty += item.quantity;
      });
    });
  }





}
