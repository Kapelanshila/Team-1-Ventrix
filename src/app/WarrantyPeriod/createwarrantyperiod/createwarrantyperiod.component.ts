import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WarrantyPeriod } from 'src/app/shared/WarrantyPeriod';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createwarrantyperiod',
  templateUrl: './createwarrantyperiod.component.html',
  styleUrls: ['./createwarrantyperiod.component.css']
})
export class CreatewarrantyperiodComponent implements OnInit {

  warrantyPeriodForm : FormGroup;
  submitted = false;
  find=false;
  warrantyPeriods:any[] = [];
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.warrantyPeriodForm = fbuilder.group({
      Description: new FormControl ('',[Validators.required, this.noWhitespaceValidator]),
    });
  }

  ngOnInit(): void {

    this.ventrixdbservice.readWarrantyPeriod()
    .subscribe(response => {
      this.warrantyPeriods = response;
      console.log(this.warrantyPeriods)
    })
  }
    
  //Form submit calls add WarrantyPeriod function
  createWarrantyPeriod()
  {
    this.submitted = true;
    //Check if warehouse does not already exsist
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

    if (this.warrantyPeriodForm.valid && this.find == false) {
      console.log(this.warrantyPeriodForm.value);
      this.ventrixdbservice.createWarrantyPeriod(this.warrantyPeriodForm.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'The warranty period has been added successfully',
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

   // Get value of formcontrol name to return it to api
   get f() { return this.warrantyPeriodForm.controls!; }



  //When Cancel button clicked returns to Read Warranty Period screen
  returnDataTable()
  {
    this.router.navigate(['/read-warranty-period']);
  }
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

