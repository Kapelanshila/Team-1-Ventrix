import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserVM } from 'src/app/shared/UserVM';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  roles:any[] = [];
  userform : FormGroup;
  submitted = false;
  createUser:User|undefined;
  user:UserVM|undefined;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.userform = fbuilder.group({
      userRoleId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readRole()
    .subscribe(response => {
      this.roles = response;
      console.log(this.roles)
    })

    this.user = this.ventrixdbservice.getUser()
    console.log(this.user);
    this.userform.patchValue({
      userRoleId: this.user?.userRoleId,
      })
  }

  //Form submit calls add user function
  updateUser()
  {
    this.submitted = true;
    this.createUser = 
    {
      userId: this.user?.userId!,
      userRoleId: Number(this.userform.get('userRoleId')?.value),
      hashedPassword: ''
    }
    if (this.userform.valid) {
      console.log(this.createUser);
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
}
