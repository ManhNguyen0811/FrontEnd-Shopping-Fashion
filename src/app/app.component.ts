import {Component, Inject, PLATFORM_ID} from '@angular/core';
import { Route, RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { CartComponent } from './components/cart/cart.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {ReactiveFormsModule} from '@angular/forms';
import {WishlistComponent} from './components/wishlist/wishlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CartComponent,
    RouterLink,
    HeaderComponent,SigninComponent,ForgotPassComponent,
    FooterComponent,HomeComponent,ProductsComponent,DetailProductComponent,ReactiveFormsModule
   , PaymentsComponent,WishlistComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent  {
  title = 'Profect_Shopping';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Chỉ khởi tạo AOS khi chạy trên trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({});}


  }
}
