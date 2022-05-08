import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {
  clientform : FormGroup;
  client: Client|undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.clientform = fbuilder.group({
      //Client ID is not displayed but is neccessary for the API to update
      clientId: new FormControl ('',[Validators.required]),
      contactPersonName: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      contactPersonSurname: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      contactPersonNumber: new FormControl ('',[Validators.required,Validators.pattern("[0-9 ]{10}"),this.noWhitespaceValidator]),
      workAddress: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      emailAddress: new FormControl ('',[Validators.required,Validators.email,this.noWhitespaceValidator]),
    });
  }

    //Populate Input values
    ngOnInit(): void 
    {
      this.client = this.ventrixdbservice.getClient();
      this.clientform.patchValue({
      clientId: this.client?.clientId,
      contactPersonName: this.client?.contactPersonName,
      contactPersonSurname: this.client?.contactPersonSurname,
      contactPersonNumber: this.client?.contactPersonNumber,
      workAddress: this.client?.workAddress,
      emailAddress: this.client?.emailAddress
      })

      this.ventrixdbservice.clearClient();
    }

    // Get value of formcontrol name to return it to api
    get f() { return this.clientform.controls!; }

    updateClient()
    {
      this.ventrixdbservice.updateClient(this.clientform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Client Updated Successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/read-client']).then(() => {
            window.location.reload();
          });
        }
      })  
    }

    //When Cancel button clicked returns to Read Client screen
    returnDataTable()
    {
      this.router.navigate(['/read-client']);
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
