import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';


import {RouterLink} from '@angular/router';
import {Product} from '../../model/product';
import {CommonModule} from '@angular/common';
import {DetailProductComponent} from '../detail-product/detail-product.component';

import {ProductService} from '../../services/product/product.service';
import {ProductsList} from '../../model/Products';
import {CategoryService} from '../../services/category/category.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink, CommonModule, DetailProductComponent, FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})


export class ProductsComponent implements OnInit {
  products?: Product[];
  totalPages?: number;
  categoryId: number = 1;
  page: number = 0;
  size: number = 3;
  sortBy: string = 'createAt';
  sortDirection: string = 'asc';
  keyword: string = ''

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {


    this.categoryService.categoryId$.subscribe((id) => {
      this.categoryId = id;
      this.loadProducts(this.categoryId);
    });
  }

  loadProducts(categoryId: number): void {
    // @ts-ignore
    console.log("categoryId", categoryId)
    this.productService.getUrlProduct(categoryId, this.page, this.size, this.sortBy, this.sortDirection, this.keyword)
      .subscribe((response: ProductsList) => {
        if (response === null || response === undefined) {
          console.log("No productsproductsproductsproducts found");
        }
        this.products = response.products;
        this.totalPages = response.totalPages;
        console.log(this.products);
      }, error => {
        console.error('Error loading products', error);
      });
  }

  setKeyword(keyword: string) {
      this.keyword = keyword;
      this.loadProducts(this.categoryId);
  }
  setSortBy(sortBy : string,byDerection : string){
    this.sortBy = sortBy;
    this.sortDirection = byDerection;
    this.loadProducts(this.categoryId);
  }

  getUniqueColors(skus: any[]): any[] {
    const uniqueColors = new Map();
    skus.forEach(sku => {
      uniqueColors.set(sku.color.value_img, sku.color);
    });
    return Array.from(uniqueColors.values());
  }

  getUniqueSizes(skus: any[]): any[] {
    const uniqueSizes = new Map();
    skus.forEach(sku => {
      uniqueSizes.set(sku.size.name, sku.size);
    });
    return Array.from(uniqueSizes.values());
  }

  get totalPagesArray(): number[] {
    return Array.from({length: this.totalPages || 0}, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (this.page !== page) {
      this.page = page;
      this.loadProducts(this.categoryId);
    }
  }
}
