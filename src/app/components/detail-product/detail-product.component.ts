import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DetailProductService} from '../../services/detail-product/detail-product.service';
import {DetailProduct} from '../../model/detail-product/DetailProduct';
import {SKU} from '../../model/SKU';
import {ProductImage} from '../../model/productImage';
import {SelectedImage} from '../../model/detail-product/selectedImage';
import {SelectedSku} from '../../model/detail-product/selectedSku';
import {Color} from '../../model/color';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  detailProductList?: DetailProduct;
  skusList? :SKU[]
  productImagesList? : ProductImage[];
  dataSkus? : SelectedSku;
  dataImg?: SelectedImage;

  activeIndexColor: number | null = null;


  constructor(private detailProductService: DetailProductService) {
  }

  ngOnInit() {
    this.loadDetailProduct(1,6,2)
    console.log("Day alf detail : "+this.detailProductList?.name)
    // @ts-ignore
    console.log("Day alf skusList : " + this.skusList[0].originalPrice)
    // @ts-ignore
    console.log("Day alf skusListaaa : "+this.skusList[0].color.name)
    // @ts-ignore
    console.log("Day alf SKUSSSSSS : "+this.dataSkus.id)

  }



  loadDetailProduct(idProduct :number,colorId: number,sizeId : number ) {
    this.detailProductService.getUrlDetailProduct(idProduct,colorId,sizeId).subscribe((dataDetail : DetailProduct) =>{
      this.detailProductList = dataDetail
      this.productImagesList = dataDetail.productImages
      this.skusList = dataDetail.skus;
      this.dataSkus = dataDetail.selectedSku
      this.dataImg = dataDetail.selectedImage

    })
  }




  getUniqueColors(skus?: any[]): any[] {
    const uniqueColors = new Map();
    // @ts-ignore
    skus.forEach(sku => {
      uniqueColors.set(sku.color.value_img, sku.color);

    });
    return Array.from(uniqueColors.values());
  }

  getUniqueSizes(skus?: any[]): any[] {
    const uniqueSizes = new Map();
    // @ts-ignore
    skus.forEach(sku => {
      uniqueSizes.set(sku.size.name, sku.size);
    });
    return Array.from(uniqueSizes.values());
  }







  activeIndexSize: number | null = null;
  setActiveSize(index: number) {
    this.activeIndexSize = index;
  };




  setActiveColor(index: number, idColor : number) {
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
