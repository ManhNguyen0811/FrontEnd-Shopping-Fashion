import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../model/category';
import {Product} from '../../model/product';
import {ProductsList} from '../../model/Products';
import {ProductService} from '../../services/product/product.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgForOf, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categoryList: Category[] = [];

  products?: Product[];
  totalPages?: number;


  constructor(
    private categoryService: CategoryService,


    ) {}
  ngOnInit(): void {
    this.getCategoryAll();

  }
  getCategoryAll(): void {
    this.categoryService.getCategoryAll().subscribe((allCategory: Category[])=>{
      this.categoryList = allCategory;
    })
  }


  onCategorySelect(id: number): void {
    this.categoryService.setCategoryId(id);
  }


}
