import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Address } from '../../model/address/address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {


  private apiUrl = `http://localhost:8080/api/v1/addresses`;
  private userService: any;

  constructor(private http: HttpClient) {
  }


  getSuggestions(address: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(address)}&format=json`;
    return this.http.get<any>(url);
  }

  getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  getCurrentUserId(): number {
    return this.userService.getUserId();
  }

  getAddressesByUserId(userId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/user/${userId}`);
  }


  createAddress(address: Address): Observable<Address> {
    console.log(address);
    return this.http.post<Address>(this.apiUrl, address);
  }

  updateAddress(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${id}`, address);
  }



  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
