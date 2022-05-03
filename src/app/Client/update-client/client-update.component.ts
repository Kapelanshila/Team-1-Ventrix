import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      contactPersonName: new FormControl ('',[Validators.required]),
      contactPersonSurname: new FormControl ('',[Validators.required,]),
      contactPersonNumber: new FormControl ('',[Validators.required,]),
      workAddress: new FormControl ('',[Validators.required,]),
      emailAddress: new FormControl ('',[Validators.required,]),
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

    updateClient()
    {
      this.ventrixdbservice.updateClient(this.clientform.value).subscribe();
      //redirects back to data table and refreshes page
      this.router.navigate(['/read-client']).then(() => {
        window.location.reload();
      });
    
    }

    //When Cancel button clicked returns to Read Client screen
    returnDataTable()
    {
      this.router.navigate(['/read-client']);
    }
}
