import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Login Details',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#077bff',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  }).then((result) => {
                    if (result.isConfirmed) {
                        this.router.navigate(['/login']).then(() => {
                        window.location.reload();
                      });
                    }
                  })  
                  }
            if (err.status === 418) {
              Swal.fire({
                  icon: 'error',
                  title: 'Invalid Email Adress',
                  text: 'This email address may not exist...',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#077bff',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then((result) => {
                  if (result.isConfirmed) {
                      this.router.navigate(['/register']).then(() => {
                    });
                  }
                })  
          }
            return throwError(() => new Error('Invalid Request'));
        }))
    }
}