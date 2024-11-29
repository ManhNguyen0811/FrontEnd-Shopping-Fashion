import {Component, OnInit} from '@angular/core';
import {AddressService} from '../../services/address/address.service';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Address} from '../../model/address/address';



@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnInit {

  addressForm: FormGroup;
  isModalOpen = false;
  isEditMode = false;

  currentAddressId: number | null = null;

  address: any = {
    city: '',
    ward: '',
    street: '',
    isDefault: false,
    user: {
      id: 1
    }
  };




  constructor(private addressService: AddressService, private fb: FormBuilder) {




    this.addressForm = this.fb.group({

      city: ['', Validators.required],
      ward: ['', Validators.required],
      street: ['', Validators.required],
      isDefault: [false],
      userId: [1]
    });

  }


  ngOnInit(): void {
    this.fetchAddresses();
  }

  fetchAddresses(): void {
    this.addressService.getAddressesByUserId(this.address).subscribe(
      (data) => {
        this.address = data;
        console.log("log test" + data)
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách địa chỉ:', error);
      }
    );
  }


  openModal(address?: Address): void {
    if (address) {
      this.isEditMode = true;
      this.currentAddressId = address.id;
      this.addressForm.patchValue(address);
    } else {
      this.isEditMode = false;
      this.addressForm.reset();
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;
      // addressData.userId = this.userId;

      addressData.userId = 1;

      if (addressData.isDefault === undefined) {
        addressData.isDefault = false;
      }

      if (this.isEditMode) {
        this.addressService.updateAddress(this.currentAddressId!, addressData).subscribe(() => {
          this.fetchAddresses();

          this.closeModal();
        });
      } else {

        addressData.userId = this.address;
        this.addressService.createAddress(addressData).subscribe(() => {

          this.fetchAddresses();
          console.log("error:  ",+addressData)
          this.closeModal();
        },
          error => {
            console.error('Error creating address:', error);
            alert('An error occurred while creating address: ' + error.message);
          }

          );
      }
    }
  }

  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id).subscribe(() => {
      this.fetchAddresses();
    });

  }

  private getCurrentUserId() {

  }

}
