import {Color} from './color';
import {Size} from './sizes';
import {ProductImage} from './productImage';
import {SKU} from './SKU';


export interface Product {
  id: number;
  name: string;
  skus: SKU[];
  productImages: ProductImage[];
  create_at: string; // Dạng ISO Date
  update_at: string;
}
