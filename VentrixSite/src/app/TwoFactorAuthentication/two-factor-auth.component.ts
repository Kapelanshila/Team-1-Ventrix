
import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import Swal from 'sweetalert2';
import { Account } from '../shared/Account';
import { OtpTimer } from '../shared/OtpTimer';
import { Mail } from '../shared/Mail';
import { PathService } from '../services/path-service.service';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})
export class TwoFactorAuthComponent implements OnInit {
timerinvalid = false;
submitted = false;
otp: string | undefined;
number!: number;
account!:Account;
otptimer!: OtpTimer[];
timer!: Number;
timeLeft!: number;
interval: any| undefined;
expired = false;
mail!: Mail;
check: string | undefined;


config :NgOtpInputConfig = {
  allowNumbersOnly: true,
  length: 5,
};

constructor( private router: Router,private ventrixdbservice:VentrixDBServiceService , private pathService: PathService) 
{ 

}

ngOnInit(): void 
{
  //Timer value from database
  this.number = Math.floor(10000 + Math.random() * 90000);
  //Gets Account Details
  this.account = this.ventrixdbservice.getAccount()!;

  this.mail = 
  {
    OTP: this.number.toString(),
    email: this.account.emailAddress.toString()
  }
  this.ventrixdbservice.sendOTP(this.mail).subscribe();

  this.ventrixdbservice.readOtpTimer()
      .subscribe(response => {
        this.otptimer = response
        this.timer = this.otptimer[0].time
        this.timeLeft = Number(this.otptimer[0].time)
       
        this.interval = setInterval(() => {
          if(this.timeLeft > 0) {
            this.timeLeft--;
          }
          if(this.timeLeft == 0)
          {
            this.timerinvalid = true
          }
        },1000)
        
      })

      this.check = this.pathService.getRequest();
}

onOtpChange(otp: string | undefined) {
  this.otp = otp;
}

resend()
{
  Swal.fire({
    icon: 'success',
    title: 'OTP Resent',
    confirmButtonText: 'OK',
    confirmButtonColor: '#077bff',
    allowOutsideClick: false,
    allowEscapeKey: false
  })
  .then((result) => {
    if (result.isConfirmed) {
      this.account = this.ventrixdbservice.getAccount()!;
      this.router.navigate(['/2FA']).then(() => {
        window.location.reload();
      });
    }
  })  
}

register()
{
  this.submitted = false;
  if (this.otp ==  undefined)
  {
    Swal.fire({
      icon: 'warning',
      title: 'Please enter an OTP Number',
      confirmButtonText: 'OK',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }
  else
  {
    if(this.otp.length != 5)
    {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Five Digits',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else
    {
      if(this.number.toString() != this.otp)
      {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid OTP Number',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
      else
      {
        //If the user requests to register 
       if (this.pathService.getPath() == '/register')
       {
        this.ventrixdbservice.Register(this.account).subscribe();
        Swal.fire({
          icon: 'success',
          title: 'Account Successfully Registered',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/question']).then(() => {
              window.location.reload();
            });
          }
        })  
       }
      
      //If the user requests to update profile
       if (this.pathService.getPath() == '/profile' && this.check == undefined)
       {
        this.ventrixdbservice.updateEmployee(this.account).subscribe();
        Swal.fire({
          icon: 'success',
          title: 'Account Successfully Updated',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/profile']).then(() => {
              window.location.reload();
            });
          }
        })  
       }

      //If the user requests to update password
       if (this.check == "checkpassword")
       {
        this.ventrixdbservice.resetPassword(this.account).subscribe();
        this.pathService.clearRequest();
        Swal.fire({
          icon: 'success',
          title: 'Password Successfully Updated',
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
   
      //If the user requests to update password
      if (this.check == "resetEmail")
      {
       this.ventrixdbservice.resetPassword(this.account).subscribe();
       this.ventrixdbservice.updateEmployee(this.account).subscribe();
       this.pathService.clearRequest();
       Swal.fire({
         icon: 'success',
         title: 'Password and Email Successfully Updated',
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

      }
    }
  }
  }

  back()
  {
    this.router.navigate(['/'+this.pathService.getPath()]).then(() => {
      window.location.reload();
    });
  }

}
