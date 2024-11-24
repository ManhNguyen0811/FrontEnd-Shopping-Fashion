import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search'; // URL API của Nominatim

  constructor(private http: HttpClient) {}

  // Hàm gọi API Nominatim để tìm kiếm địa chỉ
  getSuggestions(address: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(address)}&format=json`;
    return this.http.get<any>(url);
  }
}
