import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/v1/orders';



  constructor(private http: HttpClient) { }


  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

}
