import { WarrantyPeriod } from 'src/app/shared/WarrantyPeriod';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatewarrantyperiod',
  templateUrl: './updatewarrantyperiod.component.html',
  styleUrls: ['./updatewarrantyperiod.component.css']
})
export class UpdatewarrantyperiodComponent implements OnInit {

  warrantyPeriodForm : FormGroup;
  warrantyPeriod: WarrantyPeriod|undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.warrantyPeriodForm = fbuilder.group({
      //WarrantyPeriod ID is not displayed but is neccessary for the API to update
      WarrantyPeriodID: new FormControl ('',[Validators.required]),
      Description: new FormControl ('',[Validators.required]),
    });
  }
 //Populate Input values
    ngOnInit(): void 
    {
      this.warrantyPeriod = this.ventrixdbservice.getWarrantyPeriod();
      this.warrantyPeriodForm.patchValue({
      WarrantyPeriod: this.warrantyPeriod?.WarrantyPeriodId,
      Description: this.warrantyPeriod?.Description
      })

      this.ventrixdbservice.clearWarrantyPeriod();
    }

    updateWarrantyPeriod()
    {
      this.ventrixdbservice.updateWarrantyPeriod(this.warrantyPeriodForm.value).subscribe();
      
      Swal.fire({
        icon: 'success',
        heading: 'Update warranty period',
        title: 'The warranty period has been successfully updated',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })then((result) => {
        if (result.isConfirmed) {
 //redirects back to data table and refreshes page
      this.router.navigate(['/read-warranty-period']).then(() => {
        window.location.reload();
      });
    }
  })  
}

    //When Cancel button clicked returns to Read WarrantyPeriod screen
    returnDataTable()
    {
      this.router.navigate(['/read-warranty-period']);
    }
    }

