import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  imports: [RouterLink],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly cartService=inject(CartService);
  
  
  
  cartDetails:Icart={} as Icart;
  ngOnInit(): void {
      this.getCartData();
  }

  getCartData():void{
    this.cartService.getLogedUserCart().subscribe({
      next:(res) =>{
          console.log(res.data)
          this.cartDetails=res.data;
      },
      error:(err)=> {
          console.log(err)
      },
    })
  }
  removeItem(id:string):void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeProductFromCart(id).subscribe({
          next:(res)=> {
            console.log(res.data)
            this.cartDetails=res.data;
            this.cartService.cartNumber.set(res.numOfCartItems)
          },
          error:(err)=> {
              console.log(err)
          },
        })




        this.cartService.removeProductFromCart(id).subscribe({
          next:(res)=> {
            console.log(res.data)
            this.cartDetails=res.data;
          },
          error:(err)=> {
              console.log(err)
          },
        })


        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }
    
  increaseProduct(id:string,count:number):void{
    this.cartService.UpdateCartQuantity(id,count).subscribe({
      next:(res)=> {
          console.log(res)
          this.cartDetails=res.data;
      },
      error:(err)=> {
          console.log(err)
      },
    })
  }
  decreaseProduct(id:string,count:number):void{
    this.cartService.UpdateCartQuantity(id,count).subscribe({
      next:(res)=> {
          console.log(res)
          this.cartDetails=res.data;
      },
      error:(err)=> {
          console.log(err)
      },
    })
  }
  deletAllProducts():void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCartAll().subscribe({
          next:(res)=> {
              console.log(res)
              if(res.message==='success'){
                this.cartDetails={} as Icart
                this.cartService.cartNumber.set(res.numOfCartItem)
              }
          },
          error:(err)=> {
            console.log(err)
          },
        })


        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  }

  

  // Swal.fire({
  //   title: "Are you sure?",
  //   text: "You won't be able to revert this!",
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Yes, delete it!"
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire({
  //       title: "Deleted!",
  //       text: "Your file has been deleted.",
  //       icon: "success"
  //     });
  //   }
  // });

  

