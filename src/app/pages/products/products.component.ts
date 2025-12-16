import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ RouterLink,FormsModule],
templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
private readonly productsService =inject(ProductsService)
private readonly cartService=inject(CartService)
private readonly toastrService= inject(ToastrService)

products:Iproduct[] = [];
searchTerm: string = '';
filteredProducts: Iproduct[] = [];


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


getAllProducts():void{
  this.productsService.getAllProducts().subscribe({
      next:(res) => {
          console.log(res.data);
          this.products = res.data;
          this.filteredProducts = res.data;
      },
      error:(err) => {
          console.log(err)
      },
    })
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

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(term)
    );
  }

  



ngOnInit(): void {
  this.getAllProducts()
}









}
