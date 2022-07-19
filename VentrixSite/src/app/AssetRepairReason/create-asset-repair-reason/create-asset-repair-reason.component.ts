import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetRepairReason } from 'src/app/shared/AssetRepairReason';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-asset-repair-reason',
  templateUrl: './create-asset-repair-reason.component.html',
  styleUrls: ['./create-asset-repair-reason.component.css']
})
export class CreateAssetRepairReasonComponent implements OnInit {
  assetrepairreasonsform : FormGroup;
  submitted = false;
  find = false;
  assetrepairreasons:any[] = [];
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
        this.assetrepairreasonsform = fbuilder.group({
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator])
    });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readAssetRepairReason()
    .subscribe(response => {
      this.assetrepairreasons = response;
    })
  }
  //Form submit calls add inventory category function
  addassetrepairreasons()
  {
    this.submitted = true;
    //Check if inventory category does not already exsist
    this.assetrepairreasons.forEach(element => {
      if (element.description == this.assetrepairreasonsform.get('description')?.value) 
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'Asset Repair Reason Already Exsists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
              this.router.navigate(['/create-assetrepairreason']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
    });

    if (this.assetrepairreasonsform.valid && this.find == false) {
      console.log(this.assetrepairreasonsform.value);
      this.ventrixdbservice.createAssetRepairReason(this.assetrepairreasonsform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Asset Repair Reason Added Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-assetrepairreason']).then(() => {
              window.location.reload();
            });
          }
        })  
    }
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.assetrepairreasonsform.controls!; }

  //When Cancel button clicked returns to Read inventory category screen
  returnDataTable()
  {
    this.router.navigate(['/read-assetrepairreason']);
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
