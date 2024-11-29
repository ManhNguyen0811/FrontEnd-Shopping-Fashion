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
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  showSuccessMessage: boolean = false;
  message: string = ""
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
  qtyInStock: number = 0;
  productId?: number;
  sizeId?: number;
  colorId?: number;
  activeIndexSize: number | null = null;
  activeIndexColor: number | null = null;



  constructor(private detailProductService: DetailProductService,
              private cartService: CartService,
              private cdRef: ChangeDetectorRef,
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


  addToCart(userId: number, skuId: number | undefined, quantity: number){
    if (quantity == 0 || quantity <= 0 || isNaN(quantity)){
      this.message = "Số Lượng Không Hợp Lệ !!!"
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.getTotalItems(1)
        this.showSuccessMessage = false;
      }, 1000);
      return ;
    }
    const cartDTO ={skuId:skuId, quantity:quantity};
    //@ts-ignore
    // confirm("userId: "+userId +"skuId: "+cartDTO.skuId+ "quantity: "+cartDTO.quantity)
    this.cartService.addToCart(userId, cartDTO).subscribe(
      (response) => {
        this.message = "Thêm Cart Thành Công"
        this.showSuccessMessage = true;
        // this.cdr.detectChanges();
        setTimeout(() => {
          this.getTotalItems(1)
          this.showSuccessMessage = false;
        }, 1000);


      },(error) => {
        this.message = "Thêm Cart Thất Bại "
        this.showSuccessMessage = true;
        // this.cdr.detectChanges();
        setTimeout(() => {
          this.getTotalItems(1)
          this.showSuccessMessage = false;
        }, 1000);
        console.log(error,"Thêm thất bại.");
      }
    )
  }
  getTotalItems(userId: number): void {
    this.cartService.getTotalItemUrl(userId).subscribe(response => {
      // Lấy số totalItem từ API và gán vào biến totalItem

    }, error => {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
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

      this.getOriginalPriceBySizeAndColor(sizeId,colorId)
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
        this.colorName = sku.color.name
        this.sizeName = sku.size.name
        this.originalPrice = sku.originalPrice
        this.salePrice = sku.salePrice
        this.skuId = sku.id
        this.qtyInStock =  sku.qtyInStock
        // console.log(`Original price for size ID ${idsize} and color ID ${idcolor} is: originalPrice:
        //  ${sku.originalPrice}  salePrice : ${sku.salePrice}`);
        return; // Thoát ngay sau khi tìm thấy
      }
    });
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
    //@ts-ignore
    // this.setActiveColor(2,dataImg.colorId)



  }
  setActiveSize(index: number, idSize: number): void {
    // this.activeIndexSize = index;
    this.sizeId = idSize;  // Lưu lại sizeId
    console.log("index size: ", index, "sizeId: ", idSize);

    // Cập nhật lại giá trị giá trị dựa trên size và color hiện tại
    this.getOriginalPriceBySizeAndColor(this.sizeId, this.colorId);

    // Kiểm tra danh sách SKUs và cập nhật tên kích thước
    if (!this.skusList || this.skusList.length === 0) {
      return;
    }

    let found = false;
    try {
      this.skusList.forEach((sku) => {
        if (!found && sku.size.id === idSize) {
          this.sizeName = sku.size.name;
          found = true;
        }
      });
    } catch (error) {
      console.error("Error processing SKUs for size:", error);
    }

    // Cập nhật URL sau khi thay đổi kích cỡ
    this.updateUrl();
  }

  setActiveColor(index: number, idColor: number): void {
    // this.activeIndexColor = index;
    this.colorId = idColor;  // Lưu lại colorId
    console.log("index color: ", index, "colorId: ", idColor);

    // Cập nhật lại giá trị giá trị dựa trên size và color hiện tại
    //@ts-ignore
    this.getOriginalPriceBySizeAndColor(this.sizeId, this.colorId);

    // Kiểm tra danh sách SKUs và cập nhật tên màu sắc
    if (!this.skusList || this.skusList.length === 0) {
      return;
    }

    let found = false;
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

    // Cập nhật URL sau khi thay đổi màu sắc
    this.updateUrl();
  }





  updateUrl(): void {
    if (this.productId && this.sizeId && this.colorId) {
      this.route.navigate(['/detail_product', this.productId, this.colorId, this.sizeId], {
        queryParamsHandling: 'merge' // Để kết hợp với các tham số URL hiện tại
      });
    }
  }


  activeQty: number = 1;
  activeMinus() {
    if (this.activeQty == 1) {
      this.activeQty = 1;
    } else {
      this.activeQty--;
    }

  };
  activeAdd() {
    this.activeQty++;
  };
  validateQty(): void {
    //@ts-ignore
    if (this.activeQty === '' || this.activeQty === null || this.activeQty === undefined) {
      this.message = 'Số lượng không được để trống!';
      this.activeQty = 1; // Đặt giá trị mặc định
      return;
    }
    //@ts-ignore
    if (this.activeQty === "" ||!this.activeQty || this.activeQty <= 0) {
      this.message = 'Số lượng phải lớn hơn 0!';
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 1000);
      this.activeQty = 1; // Tự động đặt về 1 nếu không hợp lệ
      return;
    }
    this.checkStock()
  }

  checkStock(): void {
    if (this.activeQty > this.qtyInStock) {
      this.message = "Số lượng nhập vượt quá số lượng trong kho.";
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 1000);
      this.activeQty = 1;
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);

    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      event.preventDefault();
    }
  }
}
