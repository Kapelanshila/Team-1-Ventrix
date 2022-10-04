import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Account } from '../shared/Account';
import { PathService } from '../services/path-service.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  employeeform : FormGroup;
  account!: Account;
  updatedemployee: any[] = [];
  submitted = false;
  find = false;
  titles:any[] = [];
  selectedTitle:Title|undefined;
  role!: any;
  roles:any[] = [];
  users:any[] = [];
  employees:Employee[] = [];
  employee!:Employee;
  user!: any;
  passwordIsValid = false;
  checkemployee!:Employee;
  disabled!:boolean;
  
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService, private pathService:PathService)
  {
      //Additional Validation can be added here
      this.employeeform = fbuilder.group({
      //Employee ID is not displayed but is neccessary for the API to update
      employeeId: new FormControl(''),
      userId: new FormControl (''),
      name: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      surname: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      idNumber: new FormControl ({value: '', disabled: true},[Validators.required, this.noWhiteSpaceValidator, this.checkID]),
      phoneNumber: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator, Validators.pattern("[0-9]{10}")]),
      homeAddress: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      emailAddress: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator, Validators.email]),
      titleId: new FormControl ('',[Validators.required, this.noWhiteSpaceValidator]),
      hashedPassword: new FormControl (''),
      password: new FormControl (''),
    });
  }

  ngOnInit(): void 
  {
    this.disabled = false;
    //Add path to path service, neccessary for routing to the previous page 
    this.pathService.clearPath();
    this.pathService.setPath('/profile');

    this.account = this.ventrixdbservice.getAccount();
    this.employeeform.patchValue({
    employeeId: this.account?.employeeId,
    name: this.account?.name,
    surname: this.account?.surname,
    idNumber: this.account?.idNumber,
    phoneNumber: this.account?.phoneNumber,
    homeAddress: this.account?.homeAddress,
    emailAddress: this.account?.emailAddress,
    titleId: this.account?.titleId,
    userId: this.account?.userId,    
    })

    //Required to get the user role and display it on the relevant screen
    this.ventrixdbservice.readUser()
    .subscribe(response => {
      this.users = response;
      this.user = this.users.find(x => x.userId == this.account.userId);

      this.ventrixdbservice.readRole()
      .subscribe(response => {
        this.roles = response;
        this.role = this.roles.find(x => x.userRoleId == this.user.userRoleId);
      })
    })

    this.ventrixdbservice.readTitle()
    .subscribe(response => {
      this.titles = response;
    })

    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.employees = response;
    })
  }

  get f() {return this.employeeform.controls!; }


  public noWhiteSpaceValidator(control: FormControl) {
    var iCount = 0;
    for(var i = 0; i < control.value.length; i++)
    {
      if (control.value[i] == " ")
      {
        iCount += 1
      }
    }
    if (iCount != control.value.length)
    {
      return  null
    }
    return {'noWhitespaceValidator' : true}
  }

  displayStyle = "none";
  
  //Modal Open and Close Functions
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  help()
{
  this.ventrixdbservice.setPage(79);
  this.router.navigate(['/help']).then(() => {
    });
}


  updateEmployee()
  {
    this.submitted = true;
    if (this.employeeform.valid)
    {
      this.ventrixdbservice.readEmployee()
      .subscribe(response => {
        this.employees = response;
        this.checkemployee = this.employees.find(x => x.emailAddress == this.employeeform.get('emailAddress')?.value)!;
      if (this.checkemployee == undefined || (this.checkemployee.employeeId == this.account.employeeId && this.checkemployee != undefined))
      {

        //Checks if the user updated anything 
        if (this.employeeform.get('name')?.value == this.account.name
            &&  this.employeeform.get('surname')?.value == this.account.surname
            &&  this.employeeform.get('idNumber')?.value == this.account.idNumber
            &&  this.employeeform.get('phoneNumber')?.value == this.account.phoneNumber
            &&  this.employeeform.get('homeAddress')?.value == this.account.homeAddress
            &&  this.employeeform.get('emailAddress')?.value == this.account.emailAddress
            &&  this.employeeform.get('titleId')?.value == this.account.titleId
            )
          {
          Swal.fire({
            icon: 'info',
            title: 'No updated details detected',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else 
        {
        //Update Account to new details in local storage
    
        this.account =
        {
          employeeId: this.employeeform.get('employeeId')?.value,
          name : this.employeeform.get('name')?.value, 
          surname: this.employeeform.get('surname')?.value,
          idNumber: this.employeeform.get('idNumber')?.value,
          phoneNumber: this.employeeform.get('phoneNumber')?.value,
          homeAddress: this.employeeform.get('homeAddress')?.value,
          emailAddress: this.employeeform.get('emailAddress')?.value,
          titleId: this.employeeform.get('titleId')?.value,
          userId: this.employeeform.get('userId')?.value,
          hashedPassword: '',
          role:this.ventrixdbservice.getAccount().role
        }
        this.ventrixdbservice.clearAccount();
        this.ventrixdbservice.setAccount(this.account);
          this.router.navigate(['/2FA']).then(() => {
        })
        }
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: "Invalid Email Adress",
          text: "This Email Address is already associated to a user",
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
    }
    )};
  }

  updatePassword()
  {
    //Check Password has no white spaces
    var iCount = 0;
    for(var i = 0; i < this.employeeform.get('hashedPassword')!.value.length; i++)
    {
      if (this.employeeform.get('hashedPassword')!.value[i] == " ")
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
      if(this.employeeform.get('hashedPassword')!.value != this.employeeform.get('password')!.value)
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
          employeeId: this.employeeform.get('employeeId')?.value,
          name : this.employeeform.get('name')?.value, 
          surname: this.employeeform.get('surname')?.value,
          idNumber: this.employeeform.get('idNumber')?.value,
          phoneNumber: this.employeeform.get('phoneNumber')?.value,
          homeAddress: this.employeeform.get('homeAddress')?.value,
          emailAddress: this.employeeform.get('emailAddress')?.value,
          titleId: this.employeeform.get('titleId')?.value,
          userId: this.employeeform.get('userId')?.value,
          hashedPassword: this.employeeform.get('hashedPassword')?.value,
          role:this.ventrixdbservice.getAccount().role
        }
        this.ventrixdbservice.setAccount(this.account);
        this.pathService.setRequest('checkpassword');
        this.router.navigate(['/2FA']).then(() => {
        })
      }

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
  
  
  passwordValid(event: boolean) {
    this.passwordIsValid = event;
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
}
