import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NewUser } from 'src/app/shared/NewUser';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  roles:any[] = [];
  userform : FormGroup;
  submitted = false;
  createUser:NewUser|undefined;
  generatedpassword!:string;
  number!: number;
  employees:any[] = [];
  employee!:any;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.userform = fbuilder.group({
      userRoleId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      name: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      surname: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      emailAddress: new FormControl ('',[Validators.required, this.noWhitespaceValidator, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readRole()
    .subscribe(response => {
      response.forEach(element => {
       if (element.description != 'Master')
       {
        this.roles.push(element);
       }
     });
    })
  }

  //Form submit calls add user function
  addUser()
  {
    this.submitted = true;

    //Checks if user does not exist
    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.employees = response;
      this.employees.forEach(element => {
         this.employee = this.employees.find(x => x.emailAddress == this.userform.get('emailAddress')?.value);
      });

      if (this.employee != undefined)
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
      else
      {
        this.number = Math.floor(1000 + Math.random() * 9000);
        this.generatedpassword = this.userform.get('name')?.value[0].toUpperCase()+this.userform.get('surname')?.value.slice(0, 2).toLowerCase()+this.number.toString()+'@';
        
        this.createUser = 
        {
          userId: 0,
          userRoleId: Number(this.userform.get('userRoleId')?.value),
          hashedPassword: this.generatedpassword,
          name: this.userform.get('name')?.value,
          surname: this.userform.get('surname')?.value,
          emailAddress: this.userform.get('emailAddress')?.value,
        }
        if (this.userform.valid) {
          console.log(this.createUser);
          this.ventrixdbservice.createUser(this.createUser).subscribe();
            //redirects back to data table and refreshes
            //Sweet alerts are used as notifications
            Swal.fire({
              icon: 'success',
              title: 'User Added Successfully',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              Swal.fire({
                icon: 'info',
                title: 'An email will be sent to this user shortly',
                confirmButtonText: 'OK',
                confirmButtonColor: '#077bff',
                allowOutsideClick: false,
                allowEscapeKey: false
              }).then((result) => {
                if (result.isConfirmed) {
                  //Sends email to provided address with the password
                  this.ventrixdbservice.sendDetails(this.generatedpassword, this.userform.get('emailAddress')?.value).subscribe();
                  this.router.navigate(['/read-user']).then(() => {
                    window.location.reload();
                  });
                }
              })  
            })  
        }
      }
    }) 
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.userform.controls!; }

  //When Cancel button clicked returns to Read Client screen
  returnDataTable()
  {
    this.router.navigate(['/read-user']);
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
}
