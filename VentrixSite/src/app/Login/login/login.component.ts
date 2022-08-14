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
import { Employee } from 'src/app/shared/Employee';
import { Account } from 'src/app/shared/Account';
import { PathService } from 'src/app/services/path-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform : FormGroup;
  resetform : FormGroup;
  submitted = false;
  error = '';
  responsedata: any;
  users:any[] = [];
  valid = false;
  employees:Employee[] = [];
  employee!:Employee;
  password!:string;
  email!:string;
  account!:Account;
  passwordIsValid = false;
  closed = false;
  roles:any[] = [];
  role!:string;
  user:any

  constructor(fbuilder: FormBuilder, private router: Router,private authenticationService:AuthenticationService, private tokenStorageService: TokenStorageService, private ventrixdbservice:VentrixDBServiceService , private pathService:PathService)
  { 
    this.loginform = fbuilder.group({
      emailAddress: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      hashedPassword: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });

    this.resetform = fbuilder.group({
      email: new FormControl (''),
      password: new FormControl (''),
      hashedPassword: new FormControl (''),
    });
  }

  ngOnInit(): void 
  {
    this.pathService.clearPath();
    this.closed = false;
    this.authenticationService.logout();
    this.ventrixdbservice.clearAccount();
    this.ventrixdbservice.clearEmail();
  }

  pdisplayStyle = "none";
  displayStyle = "none";

  
  //Modal Open and Close Functions
  openPasswordPopup() {
    this.pdisplayStyle = "block";
    this.closed = false;
  }
  
  closePasswordPopup() {
    this.pdisplayStyle = "none";
    this.closed = true;
  }

  passwordValid(event: boolean) {
    this.passwordIsValid = event;
  }

    //Modal Open and Close Functions
    openPopup() {
      this.displayStyle = "block";
      this.closed = false;
    }
    closePopup() {
      this.displayStyle = "none";
      this.closed = true;
    }
  
    // Get value of formcontrol name to return it to api
    get f() { return this.loginform.controls!; }


  login()
  {
    this.pathService.setPath('/login');
    console.log(this.pathService.getPath());
    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.employees = response;

      this.employee = this.employees.find(x => x.emailAddress == this.loginform.get('emailAddress')?.value)!;


      
      //For master account
      this.ventrixdbservice.readUser()
      .subscribe(response => {
        this.users = response;

        this.ventrixdbservice.readRole()
        .subscribe(response => {
          this.roles = response;

   
      if(this.employee != undefined)
      {
        this.user = this.users.find(x => x.userId == this.employee.userId);
        this.role = this.roles.find(x => x.userRoleId == this.user.userRoleId).description;
      }

      
      //If the user is not registered based off the id number they cannot login
      if (this.employee != undefined && this.employee.idnumber == undefined &&  this.role != 'Master')
      {
        Swal.fire({
          icon: 'warning',
          title: "Please register your account",
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
      else
      {
        this.authenticationService.login(this.loginform.value).subscribe(
          result => {
            if (result!= null)
            {
              this.responsedata = result;
              localStorage.setItem('token',this.responsedata)
              this.account =
              {
                employeeId: this.employee.employeeId,
                name : this.employee.name,  
                surname: this.employee.surname,
                idNumber: this.employee.idnumber,
                phoneNumber: this.employee.phoneNumber,
                homeAddress: this.employee.homeAddress,
                emailAddress: this.employee.emailAddress,
                titleId: this.employee.titleId,
                userId: this.employee.userId,
                role:this.role,
                hashedPassword: ''
              }
              this.ventrixdbservice.setAccount(this.account);
              this.router.navigate(['/read-client']);
            }
          })
      }
  });
});
});
  }

    updatePassword()
    {
      this.ventrixdbservice.readEmployee()
      .subscribe(response => {
        this.employees = response;
        this.employees.forEach(element => {
           this.employee = this.employees.find(x => x.emailAddress == this.resetform.get('email')?.value)!;
        });

        if (this.employee == undefined && this.closed == false)
        {
        
          Swal.fire({
            icon: 'warning',
            title: "Invalid Email",
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else
        {
    //Check Password has no white spaces
    var iCount = 0;
    for(var i = 0; i < this.resetform.get('hashedPassword')!.value.length; i++)
    {
      if (this.resetform.get('hashedPassword')!.value[i] == " ")
      {
        iCount += 1
      }
    }

    if (iCount > 0)
    {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Password',
        text: 'Password contains white spaces!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else
    {
      if(this.resetform.get('hashedPassword')!.value != this.resetform.get('password')!.value)
      {
        Swal.fire({
          icon: 'warning',
          title: 'Password do not match',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
      else
      {
        this.account =
        {
          employeeId: this.employee.employeeId,
          name : this.employee.name,
          surname: this.employee.surname,
          idNumber: this.employee.idnumber,
          phoneNumber: this.employee.phoneNumber,
          homeAddress: this.employee.homeAddress,
          emailAddress: this.employee.emailAddress,
          titleId: this.employee.titleId,
          userId: this.employee.userId,
          role:this.role,
          hashedPassword: this.resetform.get('hashedPassword')?.value
        }
        this.ventrixdbservice.setAccount(this.account);
        this.pathService.setRequest('checkpassword');
        this.router.navigate(['/2FA']).then(() => {
        })
      }

    }
        }
      });
    }

    updateDetails()
    {
      this.pathService.setPath('/login');
      console.log(this.pathService.getPath());
      this.router.navigate(['/question']).then(() => {
      })
    }
    
    async register()
    {
       await Swal.fire({
        title: 'Register Account',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showDenyButton: true,
        denyButtonText: 'Cancel',

        cancelButtonColor: 'btn-danger',
        html:
          '<p>Email<p>'+
          '<input id="email" class="swal2-input">' +
          '<p>Password<p>'+
          '<input id="password" type="password" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            this.password = (document.getElementById("password") as HTMLInputElement).value,
            this.email = (document.getElementById("email") as HTMLInputElement).value,
          ]
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.validUser(this.password, this.email).subscribe();
          this.ventrixdbservice.setEmail(this.email);
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
