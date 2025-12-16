import { Component, inject, OnInit } from '@angular/core';
import { IBrands } from '../../shared/interfaces/i-brands';
import { BrandsService } from '../../core/services/Brands/brands.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands-detailes',
  imports: [RouterLink],
templateUrl: './brands-detailes.component.html',
  styleUrl: './brands-detailes.component.scss'
})
export class BrandsDetailesComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  private readonly activatedRoute=inject(ActivatedRoute)
  brandDetails: IBrands | null = null
  brandId:any=null
 

  getSpecificBrand(): void {
  if (!this.brandId) return; // تأكد إن الـ id موجود

  this.brandsService.getSpecificBrand(this.brandId).subscribe({
    next:(res)=> {
      console.log(res);
      this.brandDetails = res.data; // خزن النتيجة
    },
    error:(err)=> {
      console.error('❌ Error fetching brand details:', err);
    },
  });
}


  

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.brandId = params.get('_id'); // خد id من المسار
      console.log('📦 Brand ID:', this.brandId);

      if (this.brandId) {
        this.getSpecificBrand(); // استدعي الفانكشن بعد تحديد id
      } else {
        console.warn('⚠️ No brand ID found in route.');
      }
    },
    error: (err) => {
      console.error('❌ Error reading route parameters:', err);
    }
  });
}

  }


