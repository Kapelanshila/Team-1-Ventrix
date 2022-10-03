import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { AssetVM } from 'src/app/shared/AssetVM';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-asset-repair',
  templateUrl: './create-asset-repair.component.html',
  styleUrls: ['./create-asset-repair.component.css']
})
export class CreateAssetRepairComponent implements OnInit {

  types:any[] = [];
  categories:any[] = [];
  assetform : FormGroup;
  submitted = false;
  assetitem:AssetVM | undefined;
  warrantyPeriods:any[] = []; 
  manufacturers:any[] = [];
  assets:any[] = [];
  find = false;
  conditions:any[]= [];
  currentDate!:any;
  disabled = false;
  filename: string = '';
  selected!: FileList;
  clicked = false;
  asset!:any;
  reasons: any[] = [];

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService, private http: HttpClient)
  {
      //Additional Validation can be added here
      this.assetform = fbuilder.group({
      assetRepairId:new FormControl (0),
      assetId:new FormControl (''),
      assetRepairReasonId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      asserRepaired: new FormControl (false),
      date: new FormControl (null),
      userId: new FormControl (''),
    });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readAssetRepairReason()
    .subscribe(response => {
      this.reasons = response;
    })

    this.assetitem = this.ventrixdbservice.getAsset();
    this.assetform.patchValue({
      assetId:this.assetitem?.assetId
    })
  }
  
  get f() {return this.assetform.controls!; }

  returnDataTable()
  {
    this.ventrixdbservice.deleteAssetImage(this.filename).subscribe();
    this.router.navigate(['/asset-repair']);
  }

  addAssetRepair()
    {
    this.submitted = true;
      //Gets User Id for asset trail
      this.assetform.patchValue({
      userId: this.ventrixdbservice.getAccount().userId,
    })
    if (this.assetform.valid) 
      { 
        this.ventrixdbservice.createAssetRepair(this.assetform.value).subscribe();
        Swal.fire({
          icon: 'success',
          title: 'Asset Repair Added',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/asset-repair']).then(() => {
              window.location.reload();
            });
          }
        })  
        }
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
