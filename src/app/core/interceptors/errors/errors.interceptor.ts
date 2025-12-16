import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService=inject(ToastrService)
  return next(req).pipe(
    catchError((err) => {
      console.log(err); 

      
      toastrService.error(err.error?.message , 'FreshCart');

     
      return throwError(() => err);
    })
  );
  
};
