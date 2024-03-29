import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetType } from 'src/app/shared/AssetType';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AssetCategory } from 'src/app/shared/AssetCategory';

@Component({
  selector: 'app-create-assettype',
  templateUrl: './create-assettype.component.html',
  styleUrls: ['./create-assettype.component.css']
})
export class CreateAssettypeComponent implements OnInit {
  assettypeform : FormGroup;
  submitted = false;
  find = false;
  assettypes:any[] = [];
  addType:AssetType|undefined;
  assetcategory:AssetCategory|undefined;
  
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
        this.assettypeform = fbuilder.group({
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator])
    });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readInventoryType()
    .subscribe(response => {
      this.assettypes = response;
    })
  }

//Form submit calls add asset category function
addAssetType()
{
  this.submitted = true;
  //Check if asset category does not already exsist
    this.assettypes.forEach(element => {
    if (element.description == this.assettypeform.get('description')?.value) 
    {
      this.find = true;
      Swal.fire({
        icon: 'error',
        title: 'Asset Type Already Exsists',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
            this.router.navigate(['/create-assettype']).then(() => {
            window.location.reload();
          });
        }
      })  
    }
  });

  if (this.assettypeform.valid && this.find == false) {
    this.assetcategory = this.ventrixdbservice.getAssetCategory();
    this.addType = 
    {
      assetTypeId:0,
      assetCategoryId: this.assetcategory?.assetCategoryId,
      description: this.assettypeform.get('description')?.value
    }

    this.ventrixdbservice.createAssetType(this.addType).subscribe()
      //redirects back to data table and refreshes
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Asset Type Added Successfully',
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
