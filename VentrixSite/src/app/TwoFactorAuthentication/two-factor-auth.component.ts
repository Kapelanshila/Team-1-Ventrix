
import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import Swal from 'sweetalert2';
import { Register } from '../shared/Register';
import { OtpTimer } from '../shared/OtpTimer';
import { Mail } from '../shared/Mail';

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
account!:Register;
otptimer!: OtpTimer[];
timer!: Number;
timeLeft!: number;
interval: any| undefined;
expired = false;
mail!: Mail;


config :NgOtpInputConfig = {
  allowNumbersOnly: true,
  length: 5,
};

constructor( private router: Router,private ventrixdbservice:VentrixDBServiceService)  
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
  console.log(this.mail)
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
  this.account = this.ventrixdbservice.getAccount()!;

  
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

  this.mail = 
  {
    OTP: this.number.toString(),
    email: this.account.emailAddress.toString()
  }
  console.log(this.mail)
  this.ventrixdbservice.sendOTP(this.mail).subscribe();
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
    }
  }

  }

}
