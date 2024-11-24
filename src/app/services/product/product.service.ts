import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';
import {ProductsList} from '../../model/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/api/v1/products`;
  constructor(private http : HttpClient ) { }


  getUrlProduct(categoryId: number = 1
                , page: number = 0
                , size: number = 3
                , sortBy: string = 'createAt'
                , sortDirection: string ="desc"
                , keyword: string = ''
                ): Observable<ProductsList> {
    const url = `${this.apiUrl}?categoryId=${categoryId}&keyword=${keyword}&page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
    return this.http.get<ProductsList>(url);
  }


}
