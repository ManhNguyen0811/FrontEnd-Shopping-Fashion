import { Component } from '@angular/core';
import {AddressService} from '../../services/address/address.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  address = {
    city: 'Hà Nội',
    ward: 'Ba Đình',
    street: '123 Phan Đình Phùng',
    isDefault: false,
    user: { id: 1 }
  };

  constructor(private addressService: AddressService) {}

  onSubmit() {
    this.addressService.createAddress(this.address).subscribe({
      next: (response) => {
        console.log('Địa chỉ đã được tạo:', response);

      },
      error: (err) => {
        console.error('Có lỗi xảy ra khi tạo địa chỉ:', err);

      }
    });
  }

}
