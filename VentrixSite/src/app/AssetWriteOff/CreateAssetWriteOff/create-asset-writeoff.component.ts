import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { InventoryVM } from 'src/app/shared/InventoryVM';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryWriteOff } from 'src/app/shared/InventoryWriteOff';
import { AssetVM } from 'src/app/shared/AssetVM';

@Component({
  selector: 'app-create-asset-writeoff',
  templateUrl: './create-asset-writeoff.component.html',
  styleUrls: ['./create-asset-writeoff.component.css']
})
export class CreateAssetWriteoffComponent implements OnInit {
  types:any[] = [];
  categories:any[] = [];
  writeofform : FormGroup;
  submitted = false;
  assetItem:AssetVM | undefined;
  suppliers:any[] = []; 
  warehouses:any[] = [];
  inventories:any[] = [];
  find = false;
  temp:any[] = [];
  reasons:any[] = [];
  newWriteOff!:InventoryWriteOff;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.writeofform = fbuilder.group({
      assetId: new FormControl (0),
      assetWriteOffId: new FormControl (0),
      userId: new FormControl (0),
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      date: new FormControl (new Date()),
      writeOffReasonId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }
  ngOnInit(): void {
    this.ventrixdbservice.readWriteOffReason()
    .subscribe(response => {
      this.reasons = response;
    })

    this.assetItem = this.ventrixdbservice.getAsset()
    this.writeofform.patchValue({
      assetId: this.assetItem?.assetId,
      userId: this.ventrixdbservice.getAccount().userId
    })

    this.ventrixdbservice.clearInventoryWriteOff();
  }

  get f() {return this.writeofform.controls!; }

  returnDataTable()
  {
    this.router.navigate(['/write-off-inventory']);
  }

    writeOffInventory()
    {
      this.submitted = true
      if (this.writeofform.valid)
      {
          Swal.fire({
            icon: 'success',
            title: 'Asset Successfully Written Off',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.ventrixdbservice.createAssetWriteOff(this.writeofform.value).subscribe()
              this.router.navigate(['/read-asset-writeoff']).then(() => {
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
