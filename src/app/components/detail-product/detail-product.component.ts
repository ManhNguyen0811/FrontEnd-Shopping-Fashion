import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent {
  listBtnSize = ['S', 'M', 'L', 'XL'];
  activeIndexSize: number | null = null;
  setActiveSize(index: number) {
    this.activeIndexSize = index;
  };


  listColor =
    [
      'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465207/chip/goods_67_465207_chip.jpg',
      'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465207/chip/goods_32_465207_chip.jpg',
      'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/465207/chip/goods_09_465207_chip.jpg'
    ];
  activeIndexColor: number | null = null;

  setActiveColor(index: number) {
    this.activeIndexColor = index;
    console.log(index);
  };


  activeQty: number = 0;
  activeMinus() {
    if (this.activeQty <= 0) {
      this.activeQty = 0;
    } else {
      this.activeQty--;
    }

  };
  activeAdd() {
    this.activeQty++;
  };
  checkQty() {
    if (this.activeQty < 0) {
      this.activeQty = 0;
    }
  }


}
