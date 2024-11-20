import {Color} from './color';
import {Size} from './sizes';
import {Image} from './image';


export interface Product {
  id: number;
  price: number;
  name: string;
  sizes: Size[];   // Danh sách các kích cỡ
  colors: Color[]; // Danh sách các màu sắc
  images: Image[]; // Danh sách các hình ảnh
}
