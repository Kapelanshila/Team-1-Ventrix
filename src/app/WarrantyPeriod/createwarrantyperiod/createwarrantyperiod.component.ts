import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WarrantyPeriod } from 'src/app/shared/WarrantyPeriod';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createwarrantyperiod',
  templateUrl: './createwarrantyperiod.component.html',
  styleUrls: ['./createwarrantyperiod.component.css']
})
export class CreatewarrantyperiodComponent implements OnInit {

  warrantyPeriodForm : FormGroup;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.warrantyPeriodForm = fbuilder.group({
      Description: new FormControl ('',[Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  
  //Form submit calls add WarrantyPeriod function
  addWarrantyPeriod()
  {
    console.log(this.warrantyPeriodForm.value);
    this.ventrixdbservice.createClient(this.warrantyPeriodForm.value).subscribe()
        //redirects back to data table and refreshes
        this.router.navigate(['/read-warranty-period']).then(() => {
          window.location.reload();
        });
  }


  //When Cancel button clicked returns to Read Warranty Period screen
  returnDataTable()
  {
    this.router.navigate(['/read-warranty-period']);
  }

}

