import {Component, OnInit} from '@angular/core';
import {Address} from 'node:cluster';
import {AddressService} from '../../services/address/address.service';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnInit {
  addresses: Address[] = [];

  constructor(private addressService: AddressService) { }


  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAllAddresses().subscribe((data: Address[]) => {
      this.addresses = data;
    }, error => {
      console.error('Error loading addresses', error);
    });
  }


  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id).subscribe(() => {
      this.loadAddresses();
    }, error => {
      console.error('Error deleting address', error);
    });
  }

}
