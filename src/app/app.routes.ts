import { provideRouter, Routes,RouterLink } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { OTPComponent } from './components/OTP/OTP.component';
import { CartComponent } from './components/cart/cart.component';
import {PaymentsComponent} from './components/payments/payments.component';
<<<<<<< HEAD
import {AuthGuardFn} from './guards/auth.guard';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
=======
import {AddressListComponent} from './components/address-list/address-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
>>>>>>> d6a1655a657aa7d7f700285ce6a09547865c4b8c


export const routes: Routes = [
     { path: '', component: HomeComponent  },
     { path: 'home', component: HomeComponent  },
     { path: 'products', component: ProductsComponent },
     { path: 'detail_product', component: DetailProductComponent },
     { path: 'login', component: LoginComponent },
     { path: 'signin', component: SigninComponent },
<<<<<<< HEAD
     { path: 'forgotPass', component: ForgotPasswordComponent },
     { path: 'OTP', component: OTPComponent },
     { path: 'resetPassword', component: ResetPasswordComponent },
     { path: 'cart', component: CartComponent },
     { path: 'payments', component: PaymentsComponent,canActivate:[AuthGuardFn]},
=======
     { path: 'forgotPass', component: ForgotPassComponent },
    { path: 'cart', component: CartComponent },
  {path: 'wishlist', component: WishlistComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'detail_product/:productId/:colorId/:sizeId', component: DetailProductComponent },


>>>>>>> d6a1655a657aa7d7f700285ce6a09547865c4b8c
];
