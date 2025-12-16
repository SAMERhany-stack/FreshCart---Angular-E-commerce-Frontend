import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly ordersService=inject(OrdersService)
  cartId:string=""
checkOutForm!:FormGroup
ngOnInit(): void {
    this.intiateForm()
    this.getCartId()
}
intiateForm():void{
    this.checkOutForm=new FormGroup(
    {
      details:new FormControl(null,Validators.required),
      phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city:new FormControl(null,[Validators.required]),
    }
  )
}
getCartId():void{
  this.activatedRoute.paramMap.subscribe({
    next:(res)=> {
      console.log()
        this.cartId=res.get('id')!
    },
    error:(err)=> {
        console.log(err)
    },
  })
}
submitForm():void{
  console.log(this.checkOutForm.value)
  this.ordersService.checkSession(this.cartId , this.checkOutForm.value).subscribe({
    next: (res) => {
      console.log( res);
      if(res.status==='success'){
        open(res.session.url,'_self')

      }
      
    },
    error: (err) => {
      console.error( err);
      
    }
  })
}
}