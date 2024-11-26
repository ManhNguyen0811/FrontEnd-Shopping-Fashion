import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from 'node:cluster';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search';

  private apiAdress = `http://localhost:8080/api/v1/addresses`;

  constructor(private http: HttpClient) {}


  getSuggestions(address: string): Observable<any> {
    const url = `${this.apiAdress}?q=${encodeURIComponent(address)}&format=json`;
    return this.http.get<any>(url);
  }

  createAddress(address: any): Observable<any> {
    return this.http.post(this.apiUrl, address);
  }

  getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
