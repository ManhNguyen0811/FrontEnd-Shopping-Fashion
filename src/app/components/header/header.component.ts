import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import categoryData from '../../../assets/json/category.json'
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';





interface Category{
  id: number;
  name: string;
  subCategories: Category[];
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgForOf,CommonModule,HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',


})
export class HeaderComponent {
   ngOnInit(){

this.getDataApi()
   }
  categoryList : Category[] = categoryData;
   constructor (private http: HttpClient) {}
    getDataApi(){
     this.http.get("https://pokeapi.co/api/v2/pokemon/ditto").subscribe((result :any) =>{
    console.log(result);
     })
    }

   bien: any

  // constructor(private http: HttpClient){}
  //
  // public getMethodApi(){
  //   this.http.get("https://pokeapi.co/api/v2/pokemon/ditto").subscribe((result:any)=>{
  //     console.log( result)
  //       this.bien = result;
  //     console.log(this.bien)
  //   })
  // }



}
