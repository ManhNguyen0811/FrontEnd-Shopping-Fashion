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
import {Product} from '../../model/product';
import {log} from 'node:util';
import {CartService} from '../../services/cart/cart.service';
import {CartDTO} from '../../model/cart/CartDTO';


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

  originalPrice : number | undefined = 0;
  salePrice : number | undefined = 0;
  skuId : number | undefined = undefined;

  colorName : string = "";
  sizeName : string = "";
  productId?: number;
  sizeId?: number;
  colorId?: number;





  constructor(private detailProductService: DetailProductService,
              private cartService: CartService,
              private router: ActivatedRoute,
              private route: Router
              ) {
  }

  ngOnInit() {

    this.router.params.subscribe(params => {
      this.productId = +params['productId']; // dấu + để chuyển đổi thành kiểu number
      this.sizeId = +params['sizeId'];
      this.colorId = +params['colorId'];
      this.loadDetailProduct(this.productId,this.colorId,this.sizeId)
      this.setActiveSize(0,this.sizeId)
      this.setActiveColor(0,this.colorId)
      this.originalPrice = this.dataSkus?.originalPrice
      this.salePrice =  this.dataSkus?.salePrice


    });
  }

  addToCart(userId: number ,skuId:number, quantity:number){
    const cartDTO ={skuId:skuId, quantity:quantity};
    this.cartService.addToCart(userId, cartDTO).subscribe(
      (response) => {
        console.log('Thêm Cart Thành Công:', response);
      },(error) => {
        console.log(error,"Thêm thất bại.");
      }
    )
  }



  loadDetailProduct(idProduct: number, colorId: number, sizeId: number): void {
    this.detailProductService.getUrlDetailProduct(idProduct, colorId, sizeId).subscribe((dataDetail: DetailProduct) => {

      this.detailProductList = dataDetail;
      this.productImagesList = dataDetail.productImages;
      this.skusList = dataDetail.skus;
      this.dataSkus = dataDetail.selectedSku;
      this.dataImg = dataDetail.selectedImage;

      // Cập nhật giá khi có sự thay đổi
      this.originalPrice = this.dataSkus?.originalPrice;
      this.salePrice = this.dataSkus?.salePrice;

    }, (error) => {
      console.error("Error loading data: ", error);
    });
  }



  getOriginalPriceBySizeAndColor(idsize: number, idcolor: number | undefined): void {

    if (!this.skusList || this.skusList.length === 0) {
      console.warn("SKUs list is empty or undefined!");
      return;
    }


    this.skusList.forEach((sku) => {
      if (sku.size.id === idsize && sku.color.id === idcolor) {
        this.originalPrice = sku.originalPrice
        this.salePrice = sku.salePrice
        this.skuId = sku.id
        // console.log(`Original price for size ID ${idsize} and color ID ${idcolor} is: originalPrice:
        //  ${sku.originalPrice}  salePrice : ${sku.salePrice}`);
        return; // Thoát ngay sau khi tìm thấy
      }
    });

    // Nếu không tìm thấy SKU nào thỏa mãn
    console.warn(`No SKU found with size ID ${idsize} and color ID ${idcolor}`);
  }



  getUniqueColors(skus?: any[]): any[] {
    if (!skus) {
      return [];
    }

    const uniqueColors = new Map();

    try {
      skus.forEach(sku => {
        uniqueColors.set(sku.color.value_img, sku.color);
      });
    } catch (error) {
      console.error("Error processing SKUs for colors:", error);
      return [];
    }

    return Array.from(uniqueColors.values());
  }

  getUniqueSizes(skus?: any[]): any[] {
    if (!skus) {
      return [];
    }
    const uniqueSizes = new Map();
    try {
      skus.forEach(sku => {
        uniqueSizes.set(sku.size.name, sku.size);
      });
    } catch (error) {
      console.error("Error processing SKUs:", error);
      return [];
    }
    return Array.from(uniqueSizes.values());
  }

  onImageClick(img: ProductImage): void {
    this.dataImg = img;

  }
    activeIndexSize: number | null = null;
    setActiveSize(index: number, idSize: number): void {
      console.log("indexindexindex" + index);
      this.activeIndexSize = index;
      this.sizeId = idSize;
      this.getOriginalPriceBySizeAndColor(this.sizeId,this.colorId)



      if (!this.skusList || this.skusList.length === 0) {
        return;
      }
      let found = false;
      // @ts-ignore
      try {
        this.skusList.forEach((sku) => {
          if (!found && sku.size.id === idSize) {
            this.sizeName = sku.size.name; // Cập nhật tên kích cỡ
            found = true;
          }
        });
      } catch (error) {
        console.error("Error processing SKUs for size:", error);
      }


    }
  activeIndexColor: number | null = null;
    setActiveColor(index: number, idColor: number): void {

      this.activeIndexColor = index;
      console.log("indexindexindex" + index);

      this.colorId = idColor;
      // @ts-ignore
      this.getOriginalPriceBySizeAndColor(this.sizeId,this.colorId)




      if (!this.skusList || this.skusList.length === 0) {
        return;
      }

      let found = false;

      // @ts-ignore
      try {
        this.skusList.forEach((sku) => {
          if (!found && sku.color.id === idColor) {
            this.colorName = sku.color.name;

            found = true;
          }
        });
      } catch (error) {
        console.error("Error processing SKUs for color:", error);
      }
    }

  updateUrl(): void {
    if (this.productId && this.sizeId && this.colorId) {
      this.route.navigate(['/detail_product', this.productId, this.colorId, this.sizeId], {
        queryParamsHandling: 'merge' // Để kết hợp với các tham số URL hiện tại
      });
    }
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
