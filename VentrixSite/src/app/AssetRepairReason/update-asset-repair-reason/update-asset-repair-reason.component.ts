import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetRepairReason } from 'src/app/shared/AssetRepairReason';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-asset-repair-reason',
  templateUrl: './update-asset-repair-reason.component.html',
  styleUrls: ['./update-asset-repair-reason.component.css']
})
export class UpdateAssetRepairReasonComponent implements OnInit {
  assetrepairreasonsform : FormGroup;
  assetrepairreason!: AssetRepairReason;
  submitted = false;
  assetrepairreasons:any[] = [];
  find = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.assetrepairreasonsform = fbuilder.group({
      //Client ID is not displayed but is neccessary for the API to update
      assetRepairReasonId: new FormControl ('',[Validators.required]),
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

  ngOnInit(): void 
  {
      this.assetrepairreason = this.ventrixdbservice.getAssetRepairReason()!;
      this.assetrepairreasonsform.patchValue({
      assetRepairReasonId: this.assetrepairreason?.assetRepairReasonId,
      description: this.assetrepairreason?.description
      })

      this.ventrixdbservice.clearAssetRepairReason();

      this.ventrixdbservice.readAssetRepairReason()
      .subscribe(response => {
        this.assetrepairreasons = response;
      })
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.assetrepairreasonsform.controls!; }

  updateassetrepairreason()
  {
    this.submitted = true;
    //Check if Read Asset Repair Reason does not already exsist
    this.assetrepairreasons.forEach(element => {
    if (element.description == this.assetrepairreasonsform.get('description')?.value && element.assetRepairReasonId != this.assetrepairreason.assetRepairReasonId)
    {
      this.find = true;
      Swal.fire({
        icon: 'error',
        title: 'Asset Repair Reason Already Exists',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
            this.router.navigate(['/read-assetrepairreasons']).then(() => {
            window.location.reload();
          });
        }
      })  
    }
  });

    if (this.assetrepairreasonsform.valid && this.find == false) 
    { 
      this.ventrixdbservice.updateAssetRepairReason(this.assetrepairreasonsform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Asset Repair Reason Updated Successfully',
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

  //When Cancel button clicked returns to Read Asset Repair Reason creen
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

  // Only Alphabet & space
  keyPressAlphabet(event: { keyCode: number; preventDefault: () => void; }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z ]+$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
