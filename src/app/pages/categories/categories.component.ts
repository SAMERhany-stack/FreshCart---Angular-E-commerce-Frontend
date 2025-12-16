import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categories = inject (CategoriesService);
  categorie:any[] = []; 


getAllCategories():void{
    this.categories.getAllCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categorie = response.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }


  


  ngOnInit(): void {
    this.getAllCategories()
  }

  


  

}
