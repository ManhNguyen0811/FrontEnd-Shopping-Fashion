import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AddressService} from '../../services/address/address.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  list: any[] = []
  constructor(
    private addressService: AddressService) {
  }

  ngOnInit() {
    this.getApiMap();
    console.log(this.list)
  }
  getApiMap(): void {
    this.addressService.getSuggestions(" 2855 quốc lộ 1a, Hồ chí minh  ").subscribe((data: any) => {
      this.getApiMap = data;
      data.forEach((item: any) => {
        console.log(item );

      })
      console.log(data);
    })
  }

}
