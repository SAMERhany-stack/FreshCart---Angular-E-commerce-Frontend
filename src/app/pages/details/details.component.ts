import { Component, inject,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activateRoute=inject(ActivatedRoute)
  private readonly productsService=inject(ProductsService)
  private readonly cartService=inject(CartService)
  private readonly toastrService= inject(ToastrService)
  
  idProduct:any
  detailsProduct: Iproduct | null=null;

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

  ngOnInit(): void {
      this.activateRoute.paramMap.subscribe({
        next:(product_id)=>{
          this.idProduct=product_id.get('id')
          this.productsService.getSpecificProducts(this.idProduct).subscribe({
            next:(res)=>{
              console.log(res)
              this.detailsProduct=res.data
            },
            error:(err)=>{
              console.log(err)
            }
          })
        }
      })
  }
}