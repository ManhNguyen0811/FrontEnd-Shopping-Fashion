import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DetailProductService} from '../../services/detail-product/detail-product.service';
import {DetailProduct} from '../../model/detail-product/DetailProduct';
import {SKU} from '../../model/SKU';
import {ProductImage} from '../../model/productImage';
import {SelectedImage} from '../../model/detail-product/selectedImage';
import {SelectedSku} from '../../model/detail-product/selectedSku';
import {Color} from '../../model/color';
import { ActivatedRoute } from '@angular/router';


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
  colorName : string = "";
  sizeName : string = "";
  productId?: number;
  sizeId?: number;
  colorId?: number;

  activeIndexColor: number | null = null;


  constructor(private detailProductService: DetailProductService,
              private router: ActivatedRoute
              ) {
  }

  ngOnInit() {

    this.router.params.subscribe(params => {
      this.productId = +params['id']; // dấu + để chuyển đổi thành kiểu number
      this.sizeId = +params['sizeId'];
      this.colorId = +params['colorId'];
      this.loadDetailProduct(this.productId,this.colorId,this.sizeId)
      console.log(this.productId);
      console.log(this.colorId);
      console.log(this.sizeId );
    });


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

  getQtyinStock(skus? : any[]): String  {
    // @ts-ignore
      skus.forEach(sku => {

      })

    return""
  }

  activeIndexSize: number | null = null;
  setActiveSize(index: number,idSize :number) {
    console.log("idSize" +idSize);
    this.activeIndexSize = index;
    let found = false; // Biến cờ để ngăn lặp

    // @ts-ignore
    this.skusList.forEach(sku => {
      if (!found && sku.size.id === idSize) {
        this.sizeName = sku.size.name; // Cập nhật tên màu
        found = true; // Đặt biến cờ để ngăn lặp
      }
    });
  };


  setActiveColor(index: number, idColor: number) {
    this.activeIndexColor = index;
    let found = false; // Biến cờ để ngăn lặp

    // @ts-ignore
    this.skusList.forEach(sku => {
      if (!found && sku.color.id === idColor) {
        this.colorName = sku.color.name; // Cập nhật tên màu
        found = true; // Đặt biến cờ để ngăn lặp
      }
    });
  }


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
