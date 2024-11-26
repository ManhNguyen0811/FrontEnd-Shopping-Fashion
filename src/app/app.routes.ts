import { provideRouter, Routes,RouterLink } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { OTPComponent } from './components/OTP/OTP.component';
import { CartComponent } from './components/cart/cart.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {AuthGuardFn} from './guards/auth.guard';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';


export const routes: Routes = [
     { path: '', component: HomeComponent  },
     { path: 'home', component: HomeComponent  },
     { path: 'products', component: ProductsComponent },
     { path: 'detail_product', component: DetailProductComponent },
     { path: 'login', component: LoginComponent },
     { path: 'signin', component: SigninComponent },
     { path: 'forgotPass', component: ForgotPasswordComponent },
     { path: 'OTP', component: OTPComponent },
     { path: 'resetPassword', component: ResetPasswordComponent },
     { path: 'cart', component: CartComponent },
     { path: 'payments', component: PaymentsComponent,canActivate:[AuthGuardFn]},
];
