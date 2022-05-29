import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetCategory } from 'src/app/shared/AssetCategory';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-assetcategory',
  templateUrl: './create-assetcategory.component.html',
  styleUrls: ['./create-assetcategory.component.css']
})
export class CreateAssetcategoryComponent implements OnInit {
  assetcategoryform : FormGroup;
  submitted = false;
  find = false;
  assetcategories:any[] = [];
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.assetcategoryform = fbuilder.group({
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator])
    });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readAssetCategory()
    .subscribe(response => {
      this.assetcategories = response;
      console.log(this.assetcategories)
    })
    
  }
  
  //Form submit calls add asset category function
  addAssetCategory()
  {
    this.submitted = true;
    //Check if asset category does not already exsist
    this.assetcategories.forEach(element => {
    if (element.description == this.assetcategoryform.get('description')?.value)
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

    if (this.assetcategoryform.valid && this.find == false) {
      console.log(this.assetcategoryform.value);
      this.ventrixdbservice.createAssetCategory(this.assetcategoryform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Asset Category Added Successfully',
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

  // Get value of formcontrol name to return it to api
  get f() { return this.assetcategoryform.controls!; }

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
}
