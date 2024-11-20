import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';



import { RouterLink } from '@angular/router';
import {Product} from '../../model/product';
import {CommonModule} from '@angular/common';
import {DetailProductComponent} from '../detail-product/detail-product.component';

import {ProductService} from '../../services/product/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,CommonModule,DetailProductComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})


export class ProductsComponent  implements OnInit {
  listProduct: Product[]= []
constructor( private  productService: ProductService ) {
}

  ngOnInit() {
    this.getAllProducts();
    console.log(this.listProduct);
  }

  getAllProducts() : void{
    this.productService.getUrlProduct().subscribe((allProducts: Product[])=>{
      this.listProduct = allProducts;
    })
  }



}
