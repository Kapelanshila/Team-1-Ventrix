import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      contactPersonName: new FormControl ('',[Validators.required]),
      contactPersonSurname: new FormControl ('',[Validators.required,]),
      contactPersonNumber: new FormControl ('',[Validators.required,]),
      workAddress: new FormControl ('',[Validators.required,]),
      emailAddress: new FormControl ('',[Validators.required,]),
    });
  }

  ngOnInit(): void {
  }
  
  //Form submit calls add client function
  addClient()
  {
    console.log(this.clientform.value);
    this.ventrixdbservice.createClient(this.clientform.value).subscribe()
        //redirects back to data table and refreshes
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
