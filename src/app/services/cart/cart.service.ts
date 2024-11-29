import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import {CartResponse} from '../../model/cart/CartResponse';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private urlApi = `${environment.apiBaseUrl}/api/v1`;


  constructor(private http: HttpClient) { }

  getDataCart(idUser : number ) : Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.urlApi}/cart?userId=${idUser}`);
  }

  addToCart(userId: number, cartDTO: { quantity: number; skuId: number | undefined }): Observable<any> {
    return this.http.post(`${this.urlApi}/cart?userId=${userId}`, cartDTO);
  }


  getTotalItemUrl(idUser: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/cart/totalItem?userId=${idUser}`);
  }

  updateQty(cartId : number, qtyNew : number): Observable<ArrayBuffer>   {





   return this.http.put<ArrayBuffer>(`${this.urlApi}/cart?cartId=${cartId}&newQuantity=${qtyNew} `,{}).pipe(
     catchError((error) =>{
       console.error('Lỗi khi cập nhật số lượng:', error);
       return throwError(() => new Error('Không thể cập nhật số lượng!'));
     })
   );







}

}
