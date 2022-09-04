import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { AssetVM } from 'src/app/shared/AssetVM';
//Make sure swal is imported
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-asset',
  templateUrl: './read-asset.component.html',
  styleUrls: ['./read-asset.component.css']
})
export class ReadAssetComponent implements OnInit {
  assets:any[] = [];
  warranties:any[] = [];
  types:any[] = [];
  trails:any[] = [];
  locations:any[] = [];
  categories:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  item!:AssetVM;
  type:any;
  assetItems:AssetVM[] = [];
  conditions:any[] = [];
  warrantyperiods:any[] = [];
  warranty!: any;
  warehouses:any[] = [];
  repairs:any[] = [];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

  //Search query 
  query:string = '';
  ngOnInit(): void 
  {
    //Get asset from api
    this.ventrixdbservice.readAsset()
    .subscribe(response => {
      this.assets = response;

        //In the event there no assets
        if (this.assets.length != 0)
        {
            //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
            this.ventrixdbservice.readAssetType()
            .subscribe(response => {
              this.types = response;

                this.ventrixdbservice.readAssetCategory()
                .subscribe(response => {
                  this.categories = response;

                  this.ventrixdbservice.readWarrantyPeriod()
                  .subscribe(response => {
                    this.warrantyperiods = response;

                    this.ventrixdbservice.readCondition()
                    .subscribe(response => {
                      this.conditions = response;

                      this.ventrixdbservice.readWarranty()
                      .subscribe(response => {
                        this.warranties = response;


                        this.ventrixdbservice.readWarehouse()
                        .subscribe(response => {
                          this.warehouses = response;
                        
                        this.assets.forEach(asset => {
                        if (asset.assetStatus != "Written Off")
                        {
                        this.type = this.types.find(x => x.assetTypeId == asset.assetTypeId);
                        this.warranty = this.warranties.find(x => x.warrantyId == asset.warrantyId);

                        //New asset view model is assigned the retrived values from the api
                        this.item = 
                        {
                          assetId: asset.assetId,
                          conditionId: asset.conditionId,
                          warrantyId :asset.warrantyId,
                          assetTypeId:asset.assetTypeId,
                          warehouseId:asset.warehouseId,
                          manufacturer:asset.manufacturer,
                          name: asset.name,
                          type: this.types.find(x => x.assetTypeId == this.type.assetTypeId).description,
                          category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId).description,
                          warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                          condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                          warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                          warrantyDate: this.warranty.date,
                          assetImage: asset.assetImage,
                          warrantyPeriodId: this.warranty.warrantyPeriodId,
                          assetCategoryId: this.type.assetCategoryId,
                          assetStatus: asset.assetStatus,
                          value: asset.value
                        }
                        this.assetItems.push(this.item)
                      }
                      })
                      
                  })
                })
                })
              })       
            })       
          });
          console.log(this.assetItems)
        }
    })
  }

  addAsset()
  {
    this.router.navigate(['/create-asset']);
  }

  editAsset(selectedasset: AssetVM)
  {
      this.ventrixdbservice.setAsset(selectedasset);
      this.router.navigate(['/update-asset']);
  }

  searchAsset()
  { 
    this.assetItems = []

      if (this.query != '' && this.query.replace(/\s/g, '').length == 0)
      {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Search',
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
      else
      {
          this.ventrixdbservice.searchAsset(this.query.toString()).subscribe(response => {
          this.assets = response;
          console.log(response)
          if (this.assets.length == 0)
          {
            Swal.fire({
            icon: 'error',
            title: 'No Results Found',
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
          else 
          {
           //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
           this.ventrixdbservice.readAssetType()
           .subscribe(response => {
             this.types = response;

               this.ventrixdbservice.readAssetCategory()
               .subscribe(response => {
                 this.categories = response;

                 this.ventrixdbservice.readWarrantyPeriod()
                 .subscribe(response => {
                   this.warrantyperiods = response;

                   this.ventrixdbservice.readCondition()
                   .subscribe(response => {
                     this.conditions = response;

                     this.ventrixdbservice.readWarranty()
                     .subscribe(response => {
                       this.warranties = response;

                       
                       this.ventrixdbservice.readWarehouse()
                       .subscribe(response => {
                         this.warehouses = response;

                       this.assets.forEach(asset => {
                       this.type = this.types.find(x => x.assetTypeId == asset.assetTypeId);
                       this.warranty = this.warranties.find(x => x.warrantyId == asset.warrantyId);
                      
                       if (asset.assetStatus != "Written Off")
                       {
                       //New asset view model is assigned the retrived values from the api
                       this.item = 
                       {
                        assetId: asset.assetId,
                        conditionId: asset.conditionId,
                        warrantyId :asset.warrantyId,
                        assetTypeId:asset.assetTypeId,
                        warehouseId:asset.warehouseId,
                        manufacturer:asset.manufacturer,
                        name: asset.name,
                        type: this.types.find(x => x.assetTypeId == this.type.assetTypeId).description,
                        category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId).description,
                        warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                        condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                        warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                        warrantyDate: this.warranty.date,
                        assetImage: asset.assetImage,
                        warrantyPeriodId: this.warranty.warrantyPeriodId,
                        assetCategoryId: this.type.assetCategoryId,
                        assetStatus: asset.assetStatus,
                        value: asset.value
                       }
                       this.assetItems.push(this.item)
                      }
                     })

                     if (this.assetItems.length == 0)
                     {
                       Swal.fire({
                       icon: 'error',
                       title: 'No Results Found',
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

                 })
               })
              })
             })       
           })       
         });
         console.log(this.assetItems)
          }
          })
        }  
}

viewAsset(selectedasset: AssetVM)
{
  this.ventrixdbservice.setAsset(selectedasset);
  this.router.navigate(['/view-asset']);
}

//Delete Inventory Function 
deleteAsset(selecteditem: AssetVM)
{ 
            
  this.ventrixdbservice.readAssetRepair()
  .subscribe(response => {
    this.repairs = response;
  
        this.ventrixdbservice.readAssetsLocations().subscribe(response => {
          this.locations = response;
  
        if (this.trails.find((x: { assetId: Number; }) => x.assetId == selecteditem.assetId) == undefined && this.repairs.find((x: { assetId: Number; }) => x.assetId == selecteditem.assetId) == undefined)
        {
            //Sweet alerts are used as notifications
            Swal.fire({
              icon: 'warning',
              title: 'Are you sure you want to delete this asset?',
              showDenyButton: true,
              confirmButtonText: 'Yes',
              denyButtonText: `No`,
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.ventrixdbservice.deleteAsset(selecteditem).subscribe();
                this.router.navigate(['/read-asset']).then(() => {
                window.location.reload();
                });
              }
            })  
            }
            else
            {
              Swal.fire({
                icon: 'warning',
                title: 'Asset Associated to other entries',
                text:'Asset information associated to other entries',
                showDenyButton: false,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#077bff',
                allowOutsideClick: false,
                allowEscapeKey: false
              })
            }
        })
      })
      }
    }
