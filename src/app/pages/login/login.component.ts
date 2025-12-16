import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from "@angular/forms"
import { AuthService } from '../../core/services/auth/auth.service';
import { log } from 'console';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  login:FormGroup=new FormGroup({
    
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
    
  });
  
  isLoading:boolean=false;
  messageErr:string="";
  isSuccess:string="";
  submitForm():void{
    if(this.login.valid){
      this.isLoading=true;
      this.authService.sendLoginform(this.login.value).subscribe({
        next:(res)=>{
          this.isLoading=false;
          setTimeout(() => {
            localStorage.setItem('userToken',res.token);
            this.authService.saveUserData();
            this.router.navigate(['/home']);
          }, 1000);
          this.isSuccess=res.message
        },
        error:(err)=>{
          this.messageErr=err.error.message
          this.isLoading=false;
        }
      })
    }
    

  }
  
}
