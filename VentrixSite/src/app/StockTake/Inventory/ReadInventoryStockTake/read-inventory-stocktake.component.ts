import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { InventoryVM } from 'src/app/shared/InventoryVM';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { InventoryReport } from 'src/app/shared/InventoryReport';
import { Account } from 'src/app/shared/Account';
import * as saveAs from 'file-saver';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-read-inventory-stocktake',
  templateUrl: './read-inventory-stocktake.component.html',
  styleUrls: ['./read-inventory-stocktake.component.css']
})
export class ReadInventoryStocktakeComponent implements OnInit {


  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router, private http: HttpClient)  { }
  inventories:any[] = [];
  warehouses:any[] = [];
  suppliers:any[] = [];
  types:any[] = [];
  supplierorderline:any[] = [];
  clientorderline:any[] = [];
  categories:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  item!:InventoryReport;
  type:any;
  inventoryItems:any[] = [];
  account!:Account;

  //Search query 
  query:string = '';
  ngOnInit(): void {
    this.account = this.ventrixdbservice.getAccount();
    //Get inventory from api
    this.ventrixdbservice.readInventory()
    .subscribe(response => {
      this.inventories = response;
      this.inventories.forEach(inventory => {
        
        //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
        this.ventrixdbservice.readInventoryType()
        .subscribe(response => {
          this.types = response;

            this.ventrixdbservice.readInventoryCategory()
            .subscribe(response => {
              this.categories = response;

              this.ventrixdbservice.readWarehouse()
              .subscribe(response => {
                this.warehouses = response;

                this.ventrixdbservice.readSupplier()
                .subscribe(response => {
                  this.suppliers = response;

                  this.type = this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId);
                  

  
                    //New inventory view model is assigned the retrived values from the api
                    this.item = 
                    {
                      inventoryId: inventory.inventoryId,
                      warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                      type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                      category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                      supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                      name: inventory.name,
                      quantityOnHand: inventory.quantityOnHand,
                      account:'',
                      selectedWarehouse:''
                    }
                    this.inventoryItems.push(this.item)
                    
         
                })

              })

            })
            
        })

      });
    })
  }

  exportInventoryStockTake()
  {
    this.inventoryItems = [];
    this.account = this.ventrixdbservice.getAccount();
    //Get inventory from api
    this.ventrixdbservice.readInventory()
    .subscribe(response => {
      this.inventories = response;

        
        //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
        this.ventrixdbservice.readInventoryType()
        .subscribe(response => {
          this.types = response;

            this.ventrixdbservice.readInventoryCategory()
            .subscribe(response => {
              this.categories = response;

              this.ventrixdbservice.readWarehouse()
              .subscribe(response => {
                this.warehouses = response;

                this.ventrixdbservice.readSupplier()
                .subscribe(response => {
                  this.suppliers = response;

                  this.inventories.forEach(inventory => {
                  this.type = this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId);
                  
                    //New inventory view model is assigned the retrived values from the api
                    this.item = 
                    {
                      inventoryId: inventory.inventoryId,
                      warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                      type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                      category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                      supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                      name: inventory.name,
                      quantityOnHand: inventory.quantityOnHand,
                      account:'',
                      selectedWarehouse:''
                    }
                    this.inventoryItems.push(this.item)
                    
                })
                this.ventrixdbservice.exportInventoryStockTake(this.inventoryItems).subscribe(res => {
                  const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
                 saveAs(data,"Inventory Stock Take");
               });


              })

            })
            
        })

      });
    })

  }

  
  uploadFile = (files: FileList) => {
    //Sweet alerts are used as notifications
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to import this excel spreadsheet?',
      text:'Doing so will update all quantity on hand for all inventory items on the system',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        //In the event the user attempts to upload more than one file 
        let fileToUpload = <File>files[0];
        const formData = new FormData();
          formData.append('file', fileToUpload, fileToUpload.name);
          //Send file to api to be stored
          this.http.post(environment.apiUrl+'ExcelSpreadsheet/uploadInventoryStockTake', formData).subscribe();
          Swal.fire({
            icon: 'success',
            title: 'Inventory Stock Taken',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/read-inventory-stocktake']).then(() => {
                window.location.reload();
              });
            }
          })  
      }
    })  
  }


  editStock(selectedinvnetory: InventoryVM)
  {
    this.ventrixdbservice.setInventory(selectedinvnetory);
    this.router.navigate(['/create-inventory-stocktake']);
  }

  searchInventory()
  { 
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
            this.router.navigate(['/write-off-inventory']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
      else
      {
          this.ventrixdbservice.searchInventory(this.query.toString()).subscribe(response => {
          this.inventories = response;
          if (this.inventories.length == 0)
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
                this.router.navigate(['/write-off-inventory']).then(() => {
                  window.location.reload();
                });
              }
            })  
          }
          else 
          {
              this.inventoryItems = [];
             
                //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
                this.ventrixdbservice.readInventoryType()
                .subscribe(response => {
                  this.types = response;

                    this.ventrixdbservice.readInventoryCategory()
                    .subscribe(response => {
                      this.categories = response;

                      this.ventrixdbservice.readWarehouse()
                      .subscribe(response => {
                        this.warehouses = response;

                        this.ventrixdbservice.readSupplier()
                        .subscribe(response => {
                          this.suppliers = response;

                          this.inventories.forEach(inventory => {
                          this.type = this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId);
          
                          //New inventory view model is assigned the retrived values from the api
      
                            //New inventory view model is assigned the retrived values from the api
                            this.item = 
                            {
                              inventoryId: inventory.inventoryId,
                              warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                              type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                              category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                              supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                              name: inventory.name,
                              quantityOnHand: inventory.quantityOnHand,
                              account:'',
                              selectedWarehouse:''
                            }
                            this.inventoryItems.push(this.item)
            
                        })
                        
                        //In the event the inventory item does exsist but the quantity on hand is 0
                        if (this.inventoryItems.length == 0)
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
                                this.router.navigate(['/write-off-inventory']).then(() => {
                                  window.location.reload();
                                });
                              }
                            })  
                        }
                      })
                    })   
                 })
                });
              }
            })
          }  
  }
}
