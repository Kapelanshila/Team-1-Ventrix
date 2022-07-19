// import { Component, OnInit } from '@angular/core';
// import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Router, ActivatedRoute } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Query } from 'src/app/shared/Query';
// import { AssetVM } from 'src/app/shared/AssetVM';
// import Swal from 'sweetalert2';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-update-asset',
//   templateUrl: './update-asset.component.html',
//   styleUrls: ['./update-asset.component.css']
// })
// export class UpdateAssetComponent implements OnInit {
//   types:any[] = [];
//   categories:any[] = [];
//   assetform : FormGroup;
//   submitted = false;
//   assetitem:AssetVM | undefined;
//   warrantyPeriods:any[] = []; 
//   manufacturers:any[] = [];
//   assets:any[] = [];
//   conditionId: number = 0;
//   find = false;

//   constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
//   {
//       //Additional Validation can be added here
//       this.assetform = fbuilder.group({
//       assetId: new FormControl (''),
//       name: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
//       conditionId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
//       warrantyId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
//       assetTypeId: new FormControl (' ',[Validators.required,this.noWhitespaceValidator]),
//       assetCategoryId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
//     });
//   }

//   ngOnInit(): void 
//   {
//     this.ventrixdbservice.readAsset()
//     .subscribe(response => {
//       this.assets = response;
//     })

//     this.ventrixdbservice.readAssetCategory()
//     .subscribe(response => {
//       this.categories = response;
//     })

//   this.ventrixdbservice.readAssetType()
//     .subscribe(response => {
//       response.forEach(element => {
//         if (element.assetCategoryId == this.assetform.get('assetCategoryId')?.value)
//         {
//           this.types.push(element);
//         }
//       });
//       console.log(this.types)
//     }) 

//     this.ventrixdbservice.readWarrantyPeriod()
//     .subscribe(response => {
//       this.warrantyPeriods = response;
//     })

//     this.assetitem = this.ventrixdbservice.getAsset()
//     this.assetform.patchValue({
//       assetId: this.assetitem?.assetId,
//       name: this.assetitem?.name,
//       manufacturerId: this.assetitem?.manufacturer,
//       warrantyId: this.assetitem?.warranty?.warrantyPeriodId,
//       assetTypeId: this.assetitem?.type?.assetTypeId,
//       assetCategoryId: this.assetitem?.category?.assetCategoryId,
//       conditionId: this.conditionId
//     })
//   }

//   get f() {return this.assetform.controls!; }

//   returnDataTable()
//   {
//     this.router.navigate(['/read-asset']);
//   }

//   editAsset()
//     {
//       this.submitted = true;
//     //Check if asset item does not already exsist
//     this.assets.forEach(element => {
//       if (
//       element.name == this.assetform.get('name')?.value && 
//       element.assetTypeId == this.assetform.get('assetTypeId')?.value &&
//       element.warrantyPeriodId == this.assetform.get('warrantyPeriodId')?.value &&
//       element.manufacturerId == this.assetform.get('manufacturerId')?.value)
//       {
//         this.find = true;
//         Swal.fire({
//           icon: 'error',
//           title: 'Asset Item Altready Exsists',
//           confirmButtonText: 'OK',
//           confirmButtonColor: '#077bff',
//           allowOutsideClick: false,
//           allowEscapeKey: false
//         }) 
//       }
//     });

//       if (this.assetform.valid && this.find == false) 
//       { 
//         this.ventrixdbservice.updateAsset(this.assetform.value).subscribe();
//         //redirects back to data table and refreshes page
//         //Sweet alerts are used as notifications
//         Swal.fire({
//           icon: 'success',
//           title: 'Asset Item Updated Successfully',
//           confirmButtonText: 'OK',
//           confirmButtonColor: '#077bff',
//           allowOutsideClick: false,
//           allowEscapeKey: false
//         }).then((result) => {
//           if (result.isConfirmed) {
//             this.router.navigate(['/read-asset']).then(() => {
//               window.location.reload();
//             });
//           }
//         })   
//       }
//     }

//     getTypes()
//     {
//       this.assetform.patchValue({
//         assetTypeId: ''
//       })

//       if (this.assetform.get('assetCategoryId')?.value.length != 0 )
//       {
//         this.types = [];
//         console.log(this.types)
//         this.ventrixdbservice.readAssetType()
//         .subscribe(response => {
//           response.forEach(element => {
//             if (element.assetCategoryId == this.assetform.get('assetCategoryId')?.value)
//             {
//               this.types.push(element);
//             }
//           });
//         })    
//       }
//     }

//     //Check no white spaces
//     public noWhitespaceValidator(someFormControl: FormControl) 
//     {
//       var iCount = 0;
//       for(var i = 0; i < someFormControl.value.length; i++)
//       {
//         if (someFormControl.value[i] == " ")
//         {
//           iCount += 1
//         }
//       }
//       if (iCount != someFormControl.value.length)
//       {
//         return  null
//       }
//       return {'noWhitespaceValidator' : true}
//   }
// }
