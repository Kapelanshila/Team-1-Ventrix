import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetType } from 'src/app/shared/AssetType';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AssetCategory } from 'src/app/shared/AssetCategory';

@Component({
  selector: 'app-update-assettype',
  templateUrl: './update-assettype.component.html',
  styleUrls: ['./update-assettype.component.css']
})
export class UpdateAssettypeComponent implements OnInit {
  assettypeform : FormGroup;
  submitted = false;
  find = false;
  assettypes:any[] = [];
  addType:AssetType|undefined;
  assetcategory:AssetType|undefined;
  type:AssetType|undefined;
  
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
        this.assettypeform = fbuilder.group({
        assetTypeId: new FormControl (''),
        assetCategoryId: new FormControl ('',[Validators.required]),
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator])
    });
  }

  ngOnInit(): void 
  {
    this.type = this.ventrixdbservice.getAssetType();
    this.assettypeform.patchValue({
    assetTypeId: this.type?.assetTypeId,
    assetCategoryId: this.type?.assetCategoryId,
    description: this.type?.description
    })

    this.ventrixdbservice.readAssetType()
    .subscribe(response => {
      this.assettypes = response;
      console.log(this.assettypes)
    })
  }

  //Form submit calls add asset category function
  updateAssetType()
  {
    this.submitted = true;
    //Check if asset category does not already exsist
    this.assettypes.forEach(element => {
    if (element.description == this.assettypeform.get('description')?.value && element.assetTypeId != this.type?.assetTypeId)
    {
      this.find = true;
      Swal.fire({
        icon: 'error',
        title: 'Asset Type Already Exsists',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }) 
    }
    });
  if (this.assettypeform.valid && this.find == false) 
    { 
      console.log(this.assettypeform.value)
      this.ventrixdbservice.updateAssetType(this.assettypeform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Asset Type Updated Successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/read-assettype']).then(() => {
            window.location.reload();
          });
        }
      })   
    }
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.assettypeform.controls!; }

  //When Cancel button clicked returns to Read asset category screen
  returnDataTable()
  {
    this.router.navigate(['/read-assettype']);
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
