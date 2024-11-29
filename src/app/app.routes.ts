import { provideRouter, Routes,RouterLink } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { CartComponent } from './components/cart/cart.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {AddressComponent} from './components/address/address.component';
import {AddressListComponent} from './components/address-list/address-list.component';
import {ProfileComponent} from './components/profile/profile.component';


export const routes: Routes = [
     { path: '', component: HomeComponent  },
     { path: 'home', component: HomeComponent  },
     { path: 'products', component: ProductsComponent },
     { path: 'detail_product', component: DetailProductComponent },
     { path: 'login', component: LoginComponent },
     { path: 'signin', component: SigninComponent },
     { path: 'forgotPass', component: ForgotPassComponent },
    { path: 'cart', component: CartComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'detail_product/:productId/:colorId/:sizeId', component: DetailProductComponent },
  { path: 'addresses_list', component: AddressListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'payments/:totalPrice/:totalQty', component: PaymentsComponent },
];
