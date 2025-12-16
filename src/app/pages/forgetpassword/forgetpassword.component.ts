import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  step:number=1;
  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])

  })
  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })
  newPassword:FormGroup=new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPass:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)])
  })


verifyEmailSubnet():void{

  let emailValue = this.verifyEmail.value.email;
  this.newPassword.get('email')?.patchValue(emailValue);

  this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.statusMsg==='success'){
        this.step=2;

      }

    },
    error:(err)=>{
      console.log(err)

    }
  })

}

verifyCodeSubnet():void{
  this.authService.setCodeVerify(this.verifyCode.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status==='Success'){
        this.newPassword.patchValue({
          email: this.verifyEmail.value.email
        });
        this.step=3;

      }

    },
    error:(err)=>{
      console.log(err)

    }
  })

}

verifyPasswordSubnet(): void {
  const email = this.verifyEmail.value.email;
  const resetCode = this.verifyCode.value.resetCode;
  const newPassword = this.newPassword.value.newPass;

  this.authService.newPasswordVerify({
    email,
    newPassword,
    resetCode
  }).subscribe({
    next: (res) => {
      console.log(res);
      localStorage.setItem('userToken', res.token);
      this.authService.saveUserData();
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
