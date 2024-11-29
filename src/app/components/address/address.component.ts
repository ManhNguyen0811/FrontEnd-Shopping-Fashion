import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from "@angular/router";
import {GoogleMapService} from '../../services/google-map/googlemap.service';



declare var google: any;

@Component({
  selector: 'app-address',
  standalone: true,
    imports: [
        FormsModule,
        RouterOutlet,

    ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {


}
