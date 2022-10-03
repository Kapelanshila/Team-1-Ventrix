import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetCategory } from 'src/app/shared/AssetCategory';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-assetcategory',
  templateUrl: './update-assetcategory.component.html',
  styleUrls: ['./update-assetcategory.component.css']
})
export class UpdateAssetcategoryComponent implements OnInit {
  assetcategoryform : FormGroup;
  assetcategory: AssetCategory|undefined;
  submitted = false;
  assetcategories:any[] = [];
  find = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.assetcategoryform = fbuilder.group({
      assetCategoryId: new FormControl ('',[Validators.required]),
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

  ngOnInit(): void 
  {
      this.assetcategory = this.ventrixdbservice.getAssetCategory();
      this.assetcategoryform.patchValue({
      assetCategoryId: this.assetcategory?.assetCategoryId,
      description: this.assetcategory?.description
      })
      
      this.ventrixdbservice.clearAssetCategory();

      this.ventrixdbservice.readAssetCategory()
      .subscribe(response => {
        this.assetcategories = response;
      })
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.assetcategoryform.controls!; }

  updateAssetCategory()
  {
    this.submitted = true;
    //Check if asset category does not already exsist
    this.assetcategories.forEach(element => {
    if (element.description == this.assetcategoryform.get('description')?.value && element.assetCategoryId != this.assetcategory?.assetCategoryId)
    {
      this.find = true;
      Swal.fire({
        icon: 'error',
        title: 'Asset Category Already Exists',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
  });

    if (this.assetcategoryform.valid && this.find == false) 
    { 
      this.ventrixdbservice.updateAssetCategory(this.assetcategoryform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Asset Category Updated Successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/read-assetcategory']).then(() => {
            window.location.reload();
          });
        }
      })   
    }
  }

  //When Cancel button clicked returns to Read asset category screen
  returnDataTable()
  {
    this.router.navigate(['/read-assetcategory']);
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
