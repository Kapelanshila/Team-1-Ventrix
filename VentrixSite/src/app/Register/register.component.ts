import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/User';
import { UserVM } from '../shared/UserVM';
import { Account } from '../shared/Account';

import Swal from 'sweetalert2';
// import { ThemeService } from 'ng2-charts';
import { PathService } from '../services/path-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  titles:any[] = [];
  userform : FormGroup;
  submitted = false;
  employees:any[] = [];
  users:any[] = [];
  valid = true;
  found = false;
  unique = true;
  password:string = '';
  account!: Account;
  hashed:string = '';
  passwordIsValid = false;
  potentialaccount: Account | undefined;
  emailaddress!:string;
  employee:Employee | undefined;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService, private pathService: PathService) 
  { 
    this.userform = fbuilder.group({
      employeeId: new FormControl (''), 
      name: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      surname: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      idNumber: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator, this.checkID]),
      phoneNumber: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator, Validators.pattern("[0-9]{10}")]),
      homeAddress: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      emailAddress: new FormControl (''),
      titleId: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]), 
      userId: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),   
      password: new FormControl (''),   
    });
  }

  ngOnInit(): void {
    this.ventrixdbservice.readTitle()
    .subscribe(response => {
      this.titles = response;
      console.log(this.titles)
    })

    this.ventrixdbservice.clearAccount();

    //Pre populate predifned values by the admin
    this.emailaddress = this.ventrixdbservice.getEmail();
    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.employees = response;
      this.employee = this.employees.find(x => x.emailAddress == this.emailaddress);
      this.userform.patchValue({
        employeeId: this.employee?.employeeId,
        userId: this.employee?.userId,
        name: this.employee?.name,
        surname: this.employee?.surname,
        emailAddress: this.employee?.emailAddress,
        })
    })
    

    //In the event the user went back a screen then populate values
    this.potentialaccount = this.ventrixdbservice.getAccount();
    if (this.potentialaccount != undefined)
    {
      this.userform.patchValue({
        employeeId: this.potentialaccount?.employeeId,
        name: this.potentialaccount?.name,
        surname: this.potentialaccount?.surname,
        idNumber: this.potentialaccount?.idNumber,
        phoneNumber: this.potentialaccount?.phoneNumber,
        homeAddress: this.potentialaccount?.homeAddress,
        emailAddress: this.potentialaccount?.emailAddress,
        titleId: this.potentialaccount?.titleId,
        userId: this.potentialaccount?.userId,
        password: this.potentialaccount?.hashedPassword
        })
    }
  }

  get f() {return this.userform.controls!; }


  register()
  {
    this.unique = true;
    this.submitted = true;
    if (this.userform.valid)
    {
      this.ventrixdbservice.readUser()
      .subscribe(response => {
        this.users = response;

    this.ventrixdbservice.readEmployee()
      .subscribe(async response => {
        this.employees = response;
          console.log(this.employees)
          //Possibility no employees exist on the system yet 
          //So an if statement is used to check for this if this was ommited if-else statement would be undefined 
          //Validation for user ID and check if userID is available and not registered yet with an account
          if (this.employees.length != 0)
          {
            this.users.forEach(user => {   
                 this.employees.forEach(employee => {
                  //We want to determine if the user is unique so we check the email address and id number
                  if ((employee.emailAddress == this.userform.get('emailAddress')?.value && this.employee?.userId != employee.userId) || employee.idnumber == this.userform.get('idNumber')?.value )
                  {
                    this.unique = false;
                  }
                });
            });
          }

           //Notification if user is not unique 
          if (this.unique == false)
          {
            Swal.fire({
              icon: 'warning',
              title: 'Duplicate identity information was found',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            })
          }
          else 
          {
          // //Notification to re-enter password 
          //   const { value: password } = await Swal.fire({
          //   title: 'Re-enter your password',
          //   input: 'password',
          //   inputLabel: 'Password',
          //   inputPlaceholder: 'Enter your password',
          // })
      
          // //Check if entered passwords match
          // if (password != this.userform.get('password')?.value)
          // {
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'Passwords do not match',
          //     confirmButtonText: 'OK',
          //     confirmButtonColor: '#077bff',
          //     allowOutsideClick: false,
          //     allowEscapeKey: false
          //   })
          // }

                this.account =  
                {
                  employeeId: Number(this.userform.get('employeeId')?.value),
                  userId: Number(this.userform.get('userId')?.value),
                  titleId: Number(this.userform.get('titleId')?.value),
                  name: this.userform.get('name')?.value,
                  surname: this.userform.get('surname')?.value,
                  idNumber: this.userform.get('idNumber')?.value,
                  phoneNumber: this.userform.get('phoneNumber')?.value,
                  homeAddress: this.userform.get('homeAddress')?.value,
                  emailAddress: this.userform.get('emailAddress')?.value,
                  hashedPassword: '',
                  role:''
                }
                this.ventrixdbservice.setAccount(this.account);
                this.pathService.setPath('/register')
                this.router.navigate(['/2FA']);
              }      
    
        });
      })
    }
  }

  
  checkID(someFormControl : FormControl): {[valtype : string] : boolean} | 
  null {
  
    //ID Validation
    var nCheck = 0, nDigit = 0, bEven = false;
    var value = someFormControl.value.replace(/\D/g, "");
    var string = someFormControl.value.toString();
    //Year 
    var year = someFormControl.value[0]+someFormControl.value[1]
    var month = someFormControl.value[2]+someFormControl.value[3]
    var date = someFormControl.value[4]+someFormControl.value[5]
    var currentyear = new Date().getFullYear()-2000
    
    if (parseInt(year) < currentyear)
    {
      currentyear = 2000 + parseInt(year);
    }
    else
    {
      currentyear = 1900 + parseInt(year);
    }
    
    var d = new Date(currentyear.toString()+"/"+month+"/"+date);
    if(!isNaN(d.getTime()))
    {
      var validDate = true
    }
    else
    {
      validDate = false
    }

    //Residency 
    if (someFormControl.value[10] == '0' || '1')
    {
      var validResidence = true
    }
    else
    {
      validResidence = false
    }

    //Check Luhn
    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }
    if (((nCheck % 10) == 0 && validDate ==  true && validResidence == true && string.length == 13))
    {
      return  null
    }
    return {'checkID' : true }
  }
 
  public noWhiteSpaceValidator(someFormControl: FormControl)
  {
    var icount = 0;
    for(var i = 0; i < someFormControl.value.length; i++)
    {
      if(someFormControl.value[i] == " ") 
      {
        icount +=1
      }
    }
    if(icount != someFormControl.value.length)
    {
      return null
    }
    return {'noWhiteSpaceValidator': true}
  }

// Only Alphabet & space
keyPressAlphabet(event: { keyCode: number; preventDefault: () => void; }) {
  var inp = String.fromCharCode(event.keyCode);

  if (/^[a-zA-Z ]+$/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

// Only Integer Numbers
keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
  var charCode = (event.which) ? event.which : event.keyCode;
  // Only Numbers 0-9
  if ((charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

// Only AlphaNumeric
keyPressAlphanumeric(event: { keyCode: number; preventDefault: () => void; }) {
  var inp = String.fromCharCode(event.keyCode);

  if (/^[a-zA-Z0-9 ]+$/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}
}
