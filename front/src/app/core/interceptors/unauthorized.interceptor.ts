import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from '../../shared/components/snack-bar/snack-bar.service';


export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router); // Внедряем Router
  const snackBar = inject(SnackBarService);
  return next(req).pipe(
      catchError((err) => {
        if(err.status === 401){
          localStorage.removeItem('access_token')
          localStorage.removeItem('userId')
          snackBar.open('Сессия истекла, войдите снова');
          router.navigate(['/login'])
        }
        return throwError(() => err);
      })
  );
};
