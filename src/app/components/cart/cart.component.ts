import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';

import {CartResponse} from '../../model/cart/CartResponse';
import {firstValueFrom, Observable} from 'rxjs';
import {CartItem} from '../../model/cart/CartItem';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  totalPrice : number = 0;
  totalQty : number = 0;
  listCartResponse? : CartResponse;
  listCartItem? : CartItem[];
  constructor(private cartService: CartService) {
  }
  ngOnInit() {
    this.loadCart(2)
    console.log("loadCart: "+this.listCartResponse);
    this.updateQty(1,1)
  }

  updateQty(cartId: number, qty: number) {
    console.log("cartId: "+ cartId)
    console.log("qty: "+ qty)
    this.cartService.updateQty(cartId, qty).subscribe();
    this.loadCart(2)
    // window.location.reload()
  }



  loadCart(userid : number) : void{
    this.cartService.getDataCart(userid).subscribe((dataCart : CartResponse) => {
      this.listCartResponse = dataCart
      this.listCartItem = dataCart.cartItem
      dataCart.cartItem.forEach(item =>{
        this.totalPrice += item.price * item.quantity;
        this.totalQty += item.quantity;
      })

    })
  }





}
