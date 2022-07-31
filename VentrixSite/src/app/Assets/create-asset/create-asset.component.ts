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
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {
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
  warehouses:any[] = [];

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService, private http: HttpClient)
  {
      //Additional Validation can be added here
      this.assetform = fbuilder.group({
      assetId: new FormControl (0),
      name: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      warrantyPeriodId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      manufacturer: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      assetTypeId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      warehouseId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      assetCategoryId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      conditionId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      warrantyDate: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      assetImage: new FormControl (''),
      userId: new FormControl (''),
      assetStatus: new FormControl (null),
    });
  }

  uploadFile = (files: FileList) => {
    //In the event the user attempts to upload more than one file 

    if (this.clicked == true && this.filename != '')
    {
      this.ventrixdbservice.deleteAssetImage(this.filename).subscribe();
    }
    
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      this.filename = fileToUpload.name;

      //Checks files dont have the same name 
      this.ventrixdbservice.readAsset()
      .subscribe(response => {
        this.assets = response;
        this.asset = this.assets.find(x => x.assetImage.toLowerCase() == this.filename.toLowerCase());

        if (this.asset != undefined)
        {
          this.filename = '';
          this.disabled = true;
          Swal.fire({
            icon: 'warning',
            title: 'Duplicate File Name',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else
        {
          this.disabled = false;
          formData.append('file', fileToUpload, fileToUpload.name);
  
          //Send file to api to be stored
          this.http.post('https://localhost:44324/api/File/uploadAssetImage', formData).subscribe();
    
          this.clicked = true;
        }
      })
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readAsset()
    .subscribe(response => {
      this.assets = response;
    })

    this.ventrixdbservice.readWarehouse()
    .subscribe(response => {
      this.warehouses = response;
    })

    this.ventrixdbservice.readCondition()
    .subscribe(response => {
      this.conditions = response;
    })

    this.ventrixdbservice.readAssetCategory()
    .subscribe(response => {
      this.categories = response;
    })

    this.ventrixdbservice.readAssetType()
    .subscribe(response => {
      response.forEach(element => {
        if (element.assetCategoryId == this.assetform.get('assetCategoryId')?.value)
        {
          this.types.push(element);
        }
      });
      console.log(this.types)
    }) 

    this.ventrixdbservice.readWarrantyPeriod()
    .subscribe(response => {
      this.warrantyPeriods = response;
    })
  }
  
  get f() {return this.assetform.controls!; }

  returnDataTable()
  {
    this.ventrixdbservice.deleteAssetImage(this.filename).subscribe();
    this.router.navigate(['/read-asset']);
  }

  addAsset()
    {
    this.submitted = true;
    this.find = false;
    if (this.filename =='')
    {
      Swal.fire({
        icon: 'warning',
        title: 'No file selected',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else{
    console.log(this.assets)
    //Check if asset item does not already exsist
    if (this.assets.length != 0)
    {
      this.assets.forEach(element => {

        if (
          element.name.toLowerCase() == this.assetform.get('name')?.value.toLowerCase())
          {
            this.find = true;
            Swal.fire({
              icon: 'error',
              title: 'Asset Item Already Exists',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }) 
          }
    });
  }

    if (this.assetform.valid && this.find == false) 
      { 
        console.log(this.assetform.value)
        this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        //Warranty Date cannot be in the future
        if ((Date.parse(this.currentDate) < Date.parse(this.assetform.get('warrantyDate')?.value)) && (Date.parse(this.currentDate) !=  Date.parse(this.assetform.get('warrantyDate')?.value)))
        {
          Swal.fire({
            icon: 'warning',
            title: 'Invalid Date',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else
        {
        //Gets User Id for asset trail
        this.assetform.patchValue({
          userId: this.ventrixdbservice.getAccount().userId,
          assetImage: this.filename
        })
        this.ventrixdbservice.createAsset(this.assetform.value).subscribe();
        console.log(this.assetform.get('userId')?.value);
        Swal.fire({
          icon: 'success',
          title: 'Asset Item Created Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-asset']).then(() => {
              window.location.reload();
            });
          }
        })  
        }
      }
    }
  }
    getTypes()
    {
      this.assetform.patchValue({
        assetTypeId: ''
      })

      if (this.assetform.get('assetCategoryId')?.value.length != 0 )
      {
        this.types = [];
        console.log(this.types)
        this.ventrixdbservice.readAssetType()
        .subscribe(response => {
          response.forEach(element => {
            if (element.assetCategoryId == this.assetform.get('assetCategoryId')?.value)
            {
              this.types.push(element);
            }
          });
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
