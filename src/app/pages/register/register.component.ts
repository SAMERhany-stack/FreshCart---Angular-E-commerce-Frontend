import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  register:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, {validators :this.confirmPassword});
  
  isLoading:boolean=false;
  messageErr:string="";
  isSuccess:string="";
  submitForm():void{
    if(this.register.valid){
      this.isLoading=true;
      this.authService.sendRegisterform(this.register.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading=false;
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 500);
          this.isSuccess=res.message
        },
        error:(err)=>{
          this.messageErr=err.error.message
          this.isLoading=false;
        }
      })
    }else{
      this.register.markAllAsTouched();
    }
    

  }
  confirmPassword(group:AbstractControl){
    const password=group.get('password')?.value;
    const rePassword=group.get('rePassword')?.value;
    return password===rePassword? null : {mismatch:true}
  }
}
