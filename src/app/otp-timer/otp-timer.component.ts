import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OtpTimer } from '../shared/OtpTimer';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from '../services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-timer',
  templateUrl: './otp-timer.component.html',
  styleUrls: ['./otp-timer.component.css']
})
export class OtpTimerComponent implements OnInit {

 otpTimerform: FormGroup;
 otpTimers: any[] = [];
 newOtpTimer!:OtpTimer;
 submitted = false;
 constructor(fbuilder: FormBuilder, private router: Router, private ventrixdbservice:VentrixDBServiceService)
 {
   this.otpTimerform = fbuilder.group({
     timeid: new FormControl(''),
     time: new FormControl('',[Validators.required])
   });
 }

 get f() {return this.otpTimerform.controls!; }

 ngOnInit(): void {
     this.ventrixdbservice.readOtpTimer()
     .subscribe(response => {
       this.otpTimers = response
       console.log(this.otpTimers)
     })
 }

 createOtpTimer()
 {
   this.submitted = true;
   this.newOtpTimer = 
   {
     timeid: 0,
     time: this.otpTimerform.get('time')?.value,
   }
   if(this.otpTimerform.valid) {
     console.log(this.newOtpTimer);
     this.ventrixdbservice.createOtpTimer(this.newOtpTimer).subscribe()

      Swal.fire({
        icon: 'success',
        title: 'OTP Timer Added Successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if(result.isConfirmed){
          this.router.navigate(['/Otp-timer']).then(() => {
            window.location.reload();
          })
        }
      })
   }
 }

 updateOtpTimer(selectedOtpTimer: OtpTimer)
 {
   this.submitted = true;
   if (this.otpTimerform.valid) {
     if(selectedOtpTimer.time == this.otpTimerform.get('time')?.value)
     {
       Swal.fire({
         icon: 'error',
         title: 'OTP Timer already exists',
         confirmButtonText: 'OK',
         confirmButtonColor: '#077bff',
         allowOutsideClick: false,
         allowEscapeKey: false
       })
     }
     else
     {
       this.newOtpTimer = 
       {
         timeid: selectedOtpTimer.timeid,
         time: this.otpTimerform.get('time')?.value,
       }
       console.log(this.newOtpTimer);
       this.ventrixdbservice.updateOtpTimer(this.newOtpTimer).subscribe()

        Swal.fire({
          icon: 'success',
          title: 'OTP Timer updated successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if(result.isConfirmed) {
            this.router.navigate(['/otp-timer']).then(() => {
              window.location.reload();
            });
          }
        })
     }
   }
 }

 deleteOtpTimer(selectedOtpTimer: OtpTimer)
 {
   Swal.fire({
     icon: 'warning',
     title: 'Are you sure you want to delete the OTP Timer',
     showDenyButton: true,
     confirmButtonText: 'Yes',
     denyButtonText: 'No',
     confirmButtonColor: '#077bff',
     allowOutsideClick: false,
     allowEscapeKey: false
     
   }).then((result) => {
     if(result.isConfirmed) {
       this.ventrixdbservice.deleteOtpTimer(selectedOtpTimer).subscribe();
       this.router.navigate(['/otp-timer']).then(() => {
       window.location.reload();
       });
     }
   })
 }

}
