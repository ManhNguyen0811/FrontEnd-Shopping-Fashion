import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl= `${environment.apiBaseUrl}/api/v1`;
  constructor(private http: HttpClient) { }

  getCategoryAll(): Observable<Category[]> {
  return this.http.get<Category[]>(`${this.apiUrl}/category`);
  }


}
