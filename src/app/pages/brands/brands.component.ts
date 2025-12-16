import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/Brands/brands.service';
import { error } from 'console';
import { response } from 'express';
import { IBrands } from '../../shared/interfaces/i-brands';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService);
  Brands:IBrands[]=[];
  
  getAllBrands():void{
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.Brands = res.data;
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      }
    });
  }
  

  ngOnInit(): void {
    this.getAllBrands();
  }

}
