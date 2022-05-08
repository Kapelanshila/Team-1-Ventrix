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
  warrantyPeriods: any[] = [];
  find = false;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.warrantyPeriodForm = fbuilder.group({
      //WarrantyPeriod ID is not displayed but is neccessary for the API to update
      warrantyPeriodId: new FormControl (''),
      description: new FormControl ('',[Validators.required, this.noWhitespaceValidator]),
    });
  }
 //Populate Input values
    ngOnInit(): void 
    {
      this.warrantyPeriod = this.ventrixdbservice.getWarrantyPeriod();
      this.warrantyPeriodForm.patchValue({
      warrantyPeriodId: this.warrantyPeriod?.warrantyPeriodId,
      description: this.warrantyPeriod?.description
      })

      this.ventrixdbservice.clearWarrantyPeriod();

      this.ventrixdbservice.readWarrantyPeriod()
      .subscribe(response => {
        this.warrantyPeriods = response;
        console.log(this.warrantyPeriods )
      })
    }

    // Get value of formcontrol name to return it to api
    get f() { return this.warrantyPeriodForm.controls!; }

    updateWarrantyPeriod()
    {
      this.submitted = true;
    //Check if warranty-period does not already exsist
    this.warrantyPeriods.forEach(element => {
      if (element.description == this.warrantyPeriodForm.get('description')?.value 
  ) 
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'This warranty period already exists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
              this.router.navigate(['/create-warranty-period']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
    });

    if (this.warrantyPeriodForm.valid && this.find == false) 
    { 
      this.ventrixdbservice.updateWarrantyPeriod(this.warrantyPeriodForm.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'The warranty period has been updated successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/read-warranty-period']).then(() => {
            window.location.reload();
          });
        }
      })   
    }
  }

    //When Cancel button clicked returns to Read WarrantyPeriod screen
    returnDataTable()
    {
      this.router.navigate(['/read-warranty-period']);
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
    

