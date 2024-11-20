import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/product`;
  constructor(private http : HttpClient ) { }


  getUrlProduct (): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/findAll`);
  }
}
