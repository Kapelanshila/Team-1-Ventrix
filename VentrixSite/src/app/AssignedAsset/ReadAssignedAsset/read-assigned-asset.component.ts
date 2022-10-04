import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { AssetVM } from 'src/app/shared/AssetVM';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//Make sure swal is imported
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-assigned-asset',
  templateUrl: './read-assigned-asset.component.html',
  styleUrls: ['./read-assigned-asset.component.css']
})
export class ReadAssignedAssetComponent implements OnInit {
  assetform : FormGroup;
  assets:any[] = [];
  warranties:any[] = [];
  types:any[] = [];
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
  employees:any[] = [];
  reademployees:any[] = [];
  selectedEmployee!:any;
  role:any;
  user:any;
  roles:any[] = [];
  users:any[] = [];
  selectedasset!: AssetVM;

  constructor(fbuilder: FormBuilder, private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { 
    //Additional Validation can be added here
    this.assetform = fbuilder.group({
      AssignedAssetId:new FormControl (0),
      assetId:new FormControl (''),
      userId: new FormControl (''),
      employeeId: new FormControl (''),
    });
  }
    //Modal
    displayStyle = "none";
  
    openPopup(asset: AssetVM) {
      this.selectedasset = asset;
      //Only employees that are registered (i.e id number strored) are displayed also the Master roles is not displayed here either
      this.ventrixdbservice.readEmployee()
      .subscribe(response => {
        this.reademployees = response;

        this.ventrixdbservice.readUser()
        .subscribe(response => {
          this.users = response;

          this.ventrixdbservice.readRole()
          .subscribe(response => {
            this.roles = response;

              this.reademployees.forEach(element => {
                this.user = this.users.find(x => x.userId == element.userId);
           
                this.role = this.roles.find(x => x.userRoleId == this.user.userRoleId);

                if (element.idnumber != undefined &&  this.role.description != 'Master')
                {
                  this.employees.push(element);
                }
              });
              this.displayStyle = "block";
          })  
        })  
      })  
    }
  
    closePopup() {
      this.displayStyle = "none";
    }

    help()
  {
    this.ventrixdbservice.setPage(163);
    this.router.navigate(['/help']).then(() => {
      });
  }

  assignAsset()
  {
    if (this.selectedEmployee == null)
    {
      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        showDenyButton: false,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else{
    this.assetform.patchValue({
      userId: this.ventrixdbservice.getAccount().userId,
      employeeId: this.selectedEmployee,
      assetId:  this.selectedasset.assetId
    })

    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to assign this asset?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Asset Assigned',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.createAssigned(this.assetform.value).subscribe();
            this.router.navigate(['/read-assigned-asset']).then(() => {
            window.location.reload();
            });
          }
        })  
      }
    })  
  }
  }

  //Search query 
  query:string = '';
  ngOnInit(): void 
  {
    this.ventrixdbservice.clearAssetRepair();


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
                        this.type = this.types.find(x => x.assetTypeId == asset.assetTypeId);
                        this.warranty = this.warranties.find(x => x.warrantyId == asset.warrantyId);
                        
                        //null meaning there availiable
                        if (asset.assetStatus == "Available")
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
                    })
                  })
                })
              })       
            })       
          });
        }
    })
  }

  viewAssignedAssets()
  {
    this.router.navigate(['/undo-assigned-asset']);
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
            this.router.navigate(['/read-assigned-asset']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
      else
      {
          this.ventrixdbservice.searchAsset(this.query.toString()).subscribe(response => {
          this.assets = response;
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
                this.router.navigate(['/read-assigned-asset']).then(() => {
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

                                
                       if (asset.assetStatus == "Available")
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
                     //In the event the user searches for an asset that is already has the status repairing
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
                            this.router.navigate(['/read-assigned-asset']).then(() => {
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
            }
          })
        }  
}

}