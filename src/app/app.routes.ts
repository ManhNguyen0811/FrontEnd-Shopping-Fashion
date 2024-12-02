import { provideRouter, Routes,RouterLink } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotPassComponent} from './components/forgot-pass/forgot-pass.component';
import { CartComponent } from './components/cart/cart.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {AddressListComponent} from './components/address-list/address-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {AuthGuardFn} from './guards/auth.guard';
import {ChatbotComponent} from './components/chatbot/chatbot.component';


export const routes: Routes = [
     { path: '', component: HomeComponent  },
     { path: 'home', component: HomeComponent  },
     { path: 'products', component: ProductsComponent },
     { path: 'detail_product', component: DetailProductComponent },
     { path: 'login', component: LoginComponent },
     { path: 'signin', component: SigninComponent },
     { path: 'forgotPass', component: ForgotPassComponent },
     { path: 'cart', component: CartComponent },
     { path: 'wishlist', component: WishlistComponent,canActivate:[AuthGuardFn]},
     { path: 'payments', component: PaymentsComponent,canActivate:[AuthGuardFn]},
     { path: 'detail_product/:productId/:colorId/:sizeId', component: DetailProductComponent },
     {path: 'chatbot', component: ChatbotComponent },
];
