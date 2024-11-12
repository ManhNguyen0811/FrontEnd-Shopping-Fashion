import { provideRouter, Routes,RouterLink } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';


export const routes: Routes = [
     { path: '', component: HomeComponent  },
     { path: 'home', component: HomeComponent  },
     { path: 'products', component: ProductsComponent },
     { path: 'detail_product', component: DetailProductComponent }
];
