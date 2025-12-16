import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink],
templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly productsService=inject(ProductsService)
  private readonly categoriesService=inject(CategoriesService)
  private readonly cartService=inject(CartService)
  private readonly toastrService= inject(ToastrService)

  
  MaincustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    items:1,
    nav: false
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  









  products: Iproduct[] = []
  categories:Icategories[]=[]
  getProductData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products=res.data
      },
      
      
    })
  }
  getCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories=res.data
      },
      
    })
  }
  ngOnInit(): void {
      this.getProductData()
      this.getCategoriesData()
  }




  addProductToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=> {
        console.log(res)
          if(res.status==='success'){
            this.toastrService.success(res.message,'freshCart')
            this.cartService.cartNumber.set(res.numOfCartItems)
          }
      },
    })
  }




}
