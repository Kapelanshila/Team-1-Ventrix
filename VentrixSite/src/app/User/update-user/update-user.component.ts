import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserVM } from 'src/app/shared/UserVM';
import { NewUser } from 'src/app/shared/NewUser';
import { Employee } from 'src/app/shared/Employee';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  roles:any[] = [];
  userform : FormGroup;
  submitted = false;
  createUser:NewUser|undefined;
  user:UserVM|undefined;
  employees:any[] = [];
  employee!:Employee;
  generatedpassword!: string;
  number!: number;
  checkemployee!:Employee;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.userform = fbuilder.group({
      userId: new FormControl (''),
      userRoleId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      name: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      surname: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      emailAddress: new FormControl ('',[Validators.required, this.noWhitespaceValidator, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      hashedPassword: new FormControl (''),
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

    this.user = this.ventrixdbservice.getUser()

    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.employees = response;

      this.employees.forEach(element => {
        this.employee = this.employees.find(x => x.userId == this.user!.userId);
      });

      this.userform.patchValue({
        userId: this.user?.userId,
        userRoleId: this.user?.userRoleId,
        name: this.employee.name,
        surname: this.employee.surname,
        emailAddress: this.employee.emailAddress,
        })
    })

  }

  //Form submit calls add user function
  updateUser()
  {
    this.submitted = true;
    if (this.userform.valid) {
    //Checks if user does not exist
    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.employees = response;
      this.checkemployee = this.employees.find(x => x.emailAddress == this.userform.get('emailAddress')?.value);

      if (this.checkemployee == undefined || (this.checkemployee.employeeId == this.employee.employeeId && this.checkemployee != undefined))
      {
          //If the user modifies registration details a new email must be sent
          if (this.employee.emailAddress != this.userform.get('emailAddress')?.value)
          {
            this.number = Math.floor(1000 + Math.random() * 9000);
            this.generatedpassword = this.userform.get('name')?.value[0].toUpperCase()+this.userform.get('surname')?.value.slice(0, 2).toLowerCase()+this.number.toString()+'@';
            this.createUser = 
            {
              userId: Number(this.userform.get('userId')?.value),
              userRoleId: Number(this.userform.get('userRoleId')?.value),
              hashedPassword: this.generatedpassword,
              name: this.userform.get('name')?.value,
              surname: this.userform.get('surname')?.value,
              emailAddress: this.userform.get('emailAddress')?.value,
            }

            Swal.fire({
              icon: 'info',
              title: 'Modified Email',
              text: 'A new email with new login/registration details will have to be sent',
              showDenyButton: true,
              denyButtonText: 'Cancel',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.userform.patchValue({
                  hashedPassword: this.generatedpassword,
                })
                this.ventrixdbservice.updateUser(this.createUser).subscribe()
                this.ventrixdbservice.sendNewDetails(this.generatedpassword, this.userform.get('emailAddress')?.value,this.employee.emailAddress.toString()).subscribe();
    
                Swal.fire({
                  icon: 'success',
                  title: 'User Updated Successfully',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#077bff',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/read-user']).then(() => {
                      window.location.reload();
                    });
                  }
                })  
              }
            })  
          }
          else
          {
            this.createUser = 
            {
              userId: Number(this.userform.get('userId')?.value),
              userRoleId: Number(this.userform.get('userRoleId')?.value),
              hashedPassword: '',
              name: this.userform.get('name')?.value,
              surname: this.userform.get('surname')?.value,
              emailAddress: this.userform.get('emailAddress')?.value,
            }

            this.ventrixdbservice.updateUser(this.createUser).subscribe()
            //redirects back to data table and refreshes
            //Sweet alerts are used as notifications
            Swal.fire({
              icon: 'success',
              title: 'User Updated Successfully',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/read-user']).then(() => {
                  window.location.reload();
                });
              }
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
          
    }) 
    } 
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
