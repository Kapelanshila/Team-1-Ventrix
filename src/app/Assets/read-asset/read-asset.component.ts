// import { Component, OnInit } from '@angular/core';
// import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Router, ActivatedRoute } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Query } from 'src/app/shared/Query';
// import { AssetVM } from 'src/app/shared/AssetVM';
// //Make sure swal is imported
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-read-asset',
//   templateUrl: './read-asset.component.html',
//   styleUrls: ['./read-asset.component.css']
// })
// export class ReadAssetComponent implements OnInit {
//   assets:any[] = [];
//   warranties:any[] = [];
//   manufacturers:string = '';
//   types:any[] = [];
//   categories:any[] = [];
//   p: number = 1;
//   config: any; 
//   noOfRows = 10;
//   item!:AssetVM;
//   type:any;
//   assetItems:any[] = [];

//   constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

//   //Search query 
//   query:string = '';
//   ngOnInit(): void 
//   {
//     //Get inventory from api
//     this.ventrixdbservice.readAsset()
//     .subscribe(response => {
//       this.assets = response;
//       this.assets.forEach(asset => {
        
//         //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
//         this.ventrixdbservice.readAssetType()
//         .subscribe(response => {
//           this.types = response;

//             this.ventrixdbservice.readAssetCategory()
//             .subscribe(response => {
//               this.categories = response;

//               this.ventrixdbservice.readWarrantyPeriod()
//               .subscribe(response => {
//                 this.warranties = response;

//                   this.type = this.types.find(x => x.assetTypeId == asset.assetTypeId);
   
//                   //New asset view model is assigned the retrived values from the api
//                   this.item = 
//                   {
//                     assetId: asset.assetId,
//                     conditionId: asset.conditionId,
//                     warranty :this.warranties.find(x => x.warranties == asset.warehouseId),
//                     type:this.types.find(x => x.assetTypeId == asset.assetTypeId),
//                     category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId),
//                     manufacturer:this.manufacturers,
//                     name: asset.name
//                   }
//                   this.assetItems.push(this.item)
//                 })

//             })

//           })
            
//       });
//       console.log(this.assetItems)
//     })
//   }

//   addAsset()
//   {
//     this.router.navigate(['/create-asset']);
//   }

//   editAsset(selectedasset: AssetVM)
//   {
//       this.ventrixdbservice.setAsset(selectedasset);
//       this.router.navigate(['/update-asset']);
//   }

//   searchAsset()
//   { 
//       if (this.query != '' && this.query.replace(/\s/g, '').length == 0)
//       {
//         Swal.fire({
//           icon: 'error',
//           title: 'Invalid Search',
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
//       else
//       {
//           this.ventrixdbservice.searchAsset(this.query.toString()).subscribe(response => {
//           this.assets = response;
//           console.log(response)
//           if (this.assets.length == 0)
//           {
//             Swal.fire({
//             icon: 'error',
//             title: 'No Results Found',
//             confirmButtonText: 'OK',
//             confirmButtonColor: '#077bff',
//             allowOutsideClick: false,
//             allowEscapeKey: false
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 this.router.navigate(['/read-asset']).then(() => {
//                   window.location.reload();
//                 });
//               }
//             })  
//           }
//           else 
//           {
//               this.assetItems = [];
//               this.assets.forEach(asset => {
//                 //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
//                 this.ventrixdbservice.readAssetType()
//                 .subscribe(response => {
//                   this.types = response;

//                     this.ventrixdbservice.readAssetCategory()
//                     .subscribe(response => {
//                       this.categories = response;

//                       this.ventrixdbservice.readWarrantyPeriod()
//                       .subscribe(response => {
//                         this.warranties = response;

//                           this.type = this.types.find(x => x.assetTypeId == asset.assetTypeId);
          
//                           //New asset view model is assigned the retrived values from the api
//                           this.item = 
//                           {
//                             assetId: asset.inventoryId,
//                             conditionId: asset.conditionId,
//                             type:this.types.find(x => x.assetTypeId == asset.assetTypeId),
//                             category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId),
//                             warranty:this.warranties.find(x => x.warranties == asset.warranties),
//                             manufacturer:this.manufacturers,
//                             name: asset.name
//                           }
//                           this.assetItems.push(this.item)
//                       })
//                     })
//                 })   
                
//               });
//               console.log(this.assetItems)
//             }
//           })
//         }  
// }

// //Delete Inventory Function 
// deleteAsset(selecteditem: AssetVM)
// { 
//       //Sweet alerts are used as notifications
//       Swal.fire({
//         icon: 'warning',
//         title: 'Are you sure you want to delete this asset item?',
//         showDenyButton: true,
//         confirmButtonText: 'Yes',
//         denyButtonText: `No`,
//         confirmButtonColor: '#077bff',
//         allowOutsideClick: false,
//         allowEscapeKey: false
//         }).then((result) => {
//           if (result.isConfirmed) {
//             this.ventrixdbservice.deleteAsset(selecteditem).subscribe();
//             this.router.navigate(['/read-asset']).then(() => {
//             window.location.reload();
//             });
//           }
//         })  
//       }
//     }
