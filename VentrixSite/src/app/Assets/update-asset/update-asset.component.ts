import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, UrlSerializer } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { AssetVM } from 'src/app/shared/AssetVM';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-asset',
  templateUrl: './update-asset.component.html',
  styleUrls: ['./update-asset.component.css']
})
export class UpdateAssetComponent implements OnInit {
  
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
  price!: number;
  selected!: FileList;
  clicked = false;
  asset!:any;
  warehouses:any[] = [];
  dateFormat = "yyyy-MM-dd";
  language = "en";
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService, private http: HttpClient)
  {
      //Additional Validation can be added here
      this.assetform = fbuilder.group({
      assetId: new FormControl (0),
      name: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      warrantyPeriodId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      manufacturer: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      assetTypeId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      assetCategoryId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      conditionId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      warehouseId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      warrantyDate: new FormControl (''),
      assetImage: new FormControl (''),
      userId: new FormControl (''),
      warrantyId: new FormControl (''),
      assetStatus: new FormControl (''),
      value: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

  uploadFile = (files: FileList) => {
    //In the event the user attempts to upload more than one file 

    if (this.clicked == true)
    {
      this.ventrixdbservice.deleteClientOrderInvoice(this.filename).subscribe();
    }
    
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      this.filename = fileToUpload.name;

      //Checks files dont have the same name 
      this.ventrixdbservice.readAsset()
      .subscribe(response => {
        this.assets = response;
        this.asset = this.assets.find(x => x.assetImage.toLowerCase() == this.filename.toLowerCase());

        if (this.asset != undefined && this.assetitem?.assetId == this.asset.assetId)
        {
            Swal.fire({
              icon: 'info',
              title: 'Same File Name Detected ',
              text: 'Would you like to update the current image stored on the system '+this.asset.assetImage+' ?',
              showDenyButton: true,
              confirmButtonText: 'Yes',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                //Deletes and replaces file 
                this.ventrixdbservice.deleteAssetImage(this.assetitem!.assetImage!.toString()).subscribe();

                formData.append('file', fileToUpload, fileToUpload.name);
                //Send file to api to be stored
                this.http.post('https://localhost:44324/api/File/uploadAssetImage', formData).subscribe();

                this.router.navigate(['/read-asset']).then(() => {
                window.location.reload();
                });
              }
            })      
        }
        else if (this.asset != undefined && this.assetitem?.assetId != this.asset.assetId)
        {
          Swal.fire({
            icon: 'warning',
            title: 'Duplicate Image Name',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else
        {
          this.ventrixdbservice.deleteAssetImage(this.assetitem!.assetImage!.toString()).subscribe();
          formData.append('file', fileToUpload, fileToUpload.name);
  
          //Send file to api to be stored
          this.http.post('https://localhost:44324/api/File/uploadAssetImage', formData).subscribe();
          
          this.ventrixdbservice.updateAsset(this.assetform.value).subscribe();
          Swal.fire({
            icon: 'success',
            title: 'Image Successfully Updated',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if(result.isConfirmed) {
                //If file changed save changes 
                this.assetform.patchValue({
                  assetImage: fileToUpload.name,
                  userId: this.ventrixdbservice.getAccount().userId
                })
                console.log(this.assetform.value)
        
                this.router.navigate(['/read-asset']).then(() => {
                  window.location.reload();
                })
            }
          })

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


    this.ventrixdbservice.readCondition()
    .subscribe(response => {
      this.conditions = response;
    })

    this.ventrixdbservice.readAssetCategory()
    .subscribe(response => {
      this.categories = response;
    })

    this.ventrixdbservice.readWarehouse()
    .subscribe(response => {
      this.warehouses = response;
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

    this.assetitem = this.ventrixdbservice.getAsset()
    this.assetform.patchValue({
      assetId: this.assetitem?.assetId,
      name: this.assetitem?.name,
      manufacturer: this.assetitem?.manufacturer,
      warrantyPeriodId: this.assetitem?.warrantyPeriodId,
      assetTypeId: this.assetitem?.assetTypeId,
      assetCategoryId: this.assetitem?.assetCategoryId,
      conditionId: this.assetitem?.conditionId,
      warrantyDate: this.formatFormDate(this.assetitem!.warrantyDate),
      assetImage: this.assetitem?.assetImage,
      warrantyId: this.assetitem?.warrantyId,
      assetStatus: this.assetitem?.assetStatus,
      warehouseId: this.assetitem?.warehouseId,
      value: this.assetitem?.value
    })
  }
    
  formatFormDate(date: Date) {
    return formatDate(date, this.dateFormat, this.language);
  }

  get f() {return this.assetform.controls!; }

  returnDataTable()
  {
    if (this.filename != '')
    {
      this.ventrixdbservice.deleteAssetImage(this.filename).subscribe();
      this.router.navigate(['/read-asset']);
    }
    else
    {
        this.router.navigate(['/read-asset']);
    }
  }

  editAsset()
    {
      this.price = this.assetform.get('value')?.value;

    this.submitted = true;
    //Check if asset item does not already exsist
      this.assets.forEach(element => {
        if (
          element.name.toLowerCase() == this.assetform.get('name')?.value.toLowerCase() && element.assetId != this.assetitem?.assetId)
          {
            this.find = true;
            Swal.fire({
              icon: 'error',
              title: 'Asset Item Altready Exists',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }) 
          }
    });

    if (this.assetform.valid && this.find == false && this.assetform.get('value')?.value > 0) 
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
          value: this.price.toString()
        })
        this.ventrixdbservice.updateAsset(this.assetform.value).subscribe();
        console.log(this.assetform.get('userId')?.value);
        Swal.fire({
          icon: 'success',
          title: 'Asset Item Updated Successfully',
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
      else
      {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid Asset Value',
          text:'Asset Value cannot be less than zero',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
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
