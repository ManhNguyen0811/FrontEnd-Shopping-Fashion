import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../model/category';
import {Product} from '../../model/product';
import {ProductsList} from '../../model/Products';
import {ProductService} from '../../services/product/product.service';
import {CartService} from '../../services/cart/cart.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgForOf, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categoryList: Category[] = [];
totalItems?: number;
  products?: Product[];
  totalPages?: number;


  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,


    ) {}
  ngOnInit(): void {
    this.getCategoryAll();
    this.getTotalItems(1)
    console.log("total" +  this.totalItems)
  }
  getCategoryAll(): void {
    this.categoryService.getCategoryAll().subscribe((allCategory: Category[])=>{
      this.categoryList = allCategory;
    })
  }


  onCategorySelect(id: number): void {
    this.categoryService.setCategoryId(id);

  }

  getTotalItems(userId: number): void {
    this.cartService.getTotalItemUrl(userId).subscribe(response => {
      // Lấy số totalItem từ API và gán vào biến totalItem
      this.totalItems = response.totalItem;
    }, error => {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
  }

  }



