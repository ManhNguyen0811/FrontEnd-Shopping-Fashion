import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../../model/order/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/v1/orders';



  constructor(private http: HttpClient) { }


  createOrderFromCart(userId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create-from-cart/${userId}`, {});
  }

  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

}
