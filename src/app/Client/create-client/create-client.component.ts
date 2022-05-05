import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  clientform : FormGroup;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.clientform = fbuilder.group({
      contactPersonName: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      contactPersonSurname: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      contactPersonNumber: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      workAddress: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      emailAddress: new FormControl ('',[Validators.required,Validators.email,this.noWhitespaceValidator]),
    });
  }

  ngOnInit(): void {
  }
  
  //Form submit calls add client function
  addClient()
  {
    this.submitted = true;
    if (this.clientform.valid) {
      console.log(this.clientform.value);
      this.ventrixdbservice.createClient(this.clientform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Client Added Successfully',
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
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.clientform.controls!; }

  //When Cancel button clicked returns to Read Client screen
  returnDataTable()
  {
    this.router.navigate(['/read-client']);
  }

  public noWhitespaceValidator(control: FormControl) {
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
}
