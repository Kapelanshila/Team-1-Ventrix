import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication-service';
import { VentrixDBServiceService } from '../services/ventrix-db-service.service';
import { Employee } from '../shared/Employee';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    employees:Employee[] = [];
    employee:Employee | undefined;
    emailaddress!:string;
    constructor(private authenticationService: AuthenticationService, private router: Router, private ventrixdbservice:VentrixDBServiceService) { }

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

          //In the event the user enters details for an account that is already registered
          if (err.status === 444) {
            this.ventrixdbservice.readEmployee()
            .subscribe(response => {
              this.employees = response;
              this.emailaddress = this.ventrixdbservice.getEmail();
              this.employee = this.employees.find(x => x.emailAddress == this.emailaddress);
              if (this.employee?.idnumber != undefined)
              {
                Swal.fire({
                  icon: 'info',
                  title: 'This account is already registered',
                  text: 'Please login',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#077bff',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                })
              }
              else
              {
                this.router.navigate(['/register']).then(() => {
                });
              }
            })        
          }

          if (err.status === 445) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Register Details',
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

              if (err.status === 466) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Account Not Found',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#077bff',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  })
                  }

                  
              if (err.status === 469) {
                Swal.fire({
                    icon: 'info',
                    title: 'No Changes Made',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#077bff',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  })
                  }


            return throwError(() => new Error('Invalid Request'));
        }))
    }
}