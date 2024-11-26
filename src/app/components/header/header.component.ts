import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../model/category';
import {Product} from '../../model/product';
import {ProductsList} from '../../model/Products';
import {ProductService} from '../../services/product/product.service';
import {TokenService} from '../../services/token/token.service';
import {UserService} from '../../services/user/user.service';
import {UserResponse} from '../../responses/user/user.response';



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

  userResponse?:UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router

  ) {}
  ngOnInit(): void {
    this.getCategoryAll();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();

  }
  getCategoryAll(): void {
    this.categoryService.getCategoryAll().subscribe((allCategory: Category[])=>{
      this.categoryList = allCategory;
    })
  }


  onCategorySelect(id: number): void {
    this.categoryService.setCategoryId(id);
  }

  handleItemClick(index: number): void {
    //alert(`Clicked on "${index}"`);
    if(index === 0) {
      debugger
      this.router.navigate(['/user-profile']);
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item
  }


}
