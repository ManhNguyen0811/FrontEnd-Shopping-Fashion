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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,
    RouterLink, HeaderComponent,
    FooterComponent,HomeComponent,ProductsComponent,DetailProductComponent],
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
