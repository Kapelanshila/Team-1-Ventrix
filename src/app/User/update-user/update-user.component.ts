import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userform : FormGroup;
  user: User|undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.userform = fbuilder.group({
      //User ID is not displayed but is neccessary for the API to update
      userId: new FormControl ('',[Validators.required]),
      userRoleId: new FormControl ('',[Validators.required]),
    });
  }

  //Populate Input values
  ngOnInit(): void 
  {
    this.user = this.ventrixdbservice.getUser();
    this.userform.patchValue({
    userId: this.user?.UserId,
    userRoleId: this.user?.UserRoleId,
    })

    this.ventrixdbservice.clearClient();
  }

  get f() { return this.userform.controls!;}

  updateUser()
  {
    this.submitted = true;
    if (this.userform.valid)
    {
      this.ventrixdbservice.updateUser(this.userform.value).subscribe();
      //redirects back to data table and refreshes page
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

  //When Cancel button clicked returns to Read User screen
  returnDataTable()
  {
    this.router.navigate(['/read-user']);
  }
}
