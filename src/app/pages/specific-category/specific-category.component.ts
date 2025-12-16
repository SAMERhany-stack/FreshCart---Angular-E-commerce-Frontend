import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specific-category',
  imports: [RouterLink,CommonModule],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent implements OnInit{
  categorieId: string | null = null;
  categoryDetails: any = null;

  // ✅ Inject services
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService = inject(CategoriesService);

  // ✅ Fetch category details by ID
  private getSpecificCategory(id: string): void {
    this.categoriesService.getSpecificCategories(id).subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);
        this.categoryDetails = response.data;
      },
      error: (error) => {
        console.error('❌ Error fetching specific category:', error);
      }
    });
  }




  








  // ✅ Initialize component
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        const id = res.get('_id');
        this.categorieId = id;

        if (id) {
          this.getSpecificCategory(id);
        } else {
          console.warn('⚠️ No category ID found in route.');
        }
      },
      error: (err) => {
        console.error('❌ Error reading route parameters:', err);
      }
    });
  }
}
  
