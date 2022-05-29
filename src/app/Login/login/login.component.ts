import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { UserAuthenticate } from 'src/app/shared/UserAuthenticate';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { TokenStorageService } from 'src/app/_helpers/TokenStorageService';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform : FormGroup;
  submitted = false;
  error = '';
  responsedata: any;
  users:any[] = [];
  valid = false;
  employees:any[] = [];

  constructor(fbuilder: FormBuilder, private router: Router,private authenticationService:AuthenticationService, private tokenStorageService: TokenStorageService, private ventrixdbservice:VentrixDBServiceService) 
  { 
    this.loginform = fbuilder.group({
      emailAddress: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      hashedPassword: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

  ngOnInit(): void 
  {
    this.authenticationService.logout();
    this.ventrixdbservice.clearAccount();
  }

    // Get value of formcontrol name to return it to api
    get f() { return this.loginform.controls!; }


  login()
  {
  this.authenticationService.login(this.loginform.value).subscribe(
    result => {
      if (result!= null)
      {
        this.responsedata = result;
        localStorage.setItem('token',this.responsedata)
        console.log(localStorage.getItem('token'))
        this.router.navigate(['/read-client']);
      }
    })
  }
   
   //Check no white spaces
   public noWhitespaceValidator(someFormControl: FormControl) 
   {
     var iCount = 0;
     for(var i = 0; i < someFormControl.value.length; i++)
     {
       if (someFormControl.value[i] == " ")
       {
         iCount += 1
       }
     }
     if (iCount != someFormControl.value.length)
     {
       return  null
     }
     return {'noWhitespaceValidator' : true}

 }
}
