import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
