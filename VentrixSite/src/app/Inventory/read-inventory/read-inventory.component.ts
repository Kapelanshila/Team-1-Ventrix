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

@Component({
  selector: 'app-read-inventory',
  templateUrl: './read-inventory.component.html',
  styleUrls: ['./read-inventory.component.css']
})
export class ReadInventoryComponent implements OnInit {

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router)  { }
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
  item!:InventoryVM;
  type:any;
  inventoryItems:any[] = [];
  inventorywriteoffs!:any;
  clientorders!:any;
  supplierorders!:any;

  //Search query 
  query:string = '';
  ngOnInit(): void {
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
                    quantityOnHand: inventory.quantityOnHand
                  }
                  this.inventoryItems.push(this.item)
         
                })

              })

            })
            
        })

      });
      console.log(this.inventoryItems)
    })
  }

  addInventory()
  {
    this.router.navigate(['/create-inventory']);
  }

  editInventory(selectedinvnetory: InventoryVM)
  {
      this.ventrixdbservice.setInventory(selectedinvnetory);
      this.router.navigate(['/update-inventory']);
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
            this.router.navigate(['/read-client']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
      else
      {
          this.ventrixdbservice.searchInventory(this.query.toString()).subscribe(response => {
          this.inventories = response;
          console.log(response)
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
                this.router.navigate(['/read-client']).then(() => {
                  window.location.reload();
                });
              }
            })  
          }
          else 
          {
              this.inventoryItems = [];
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
                            quantityOnHand: inventory.quantityOnHand
                          }
                          this.inventoryItems.push(this.item)
                        })
                      })
                    })   
                 })
                });
                   console.log(this.inventoryItems)
              }
            })
          }  
}

  //Delete Inventory Function 
  deleteInventory(selecteditem: InventoryVM)
  { 
    this.ventrixdbservice.readInventoryWriteOffLine()
    .subscribe(response => {
      this.inventorywriteoffs = response;

      this.ventrixdbservice.readClientOrderLine()
      .subscribe(response => {
        this.clientorders = response;

        this.ventrixdbservice.readSupplierOrderLine()
        .subscribe(response => {
          this.supplierorders = response;
  

      if (this.inventorywriteoffs.find((x: { inventoryId: Number; }) => x.inventoryId == selecteditem.inventoryId) && undefined || this.clientorders.find((x: { inventoryId: Number; }) => x.inventoryId == selecteditem.inventoryId) == undefined || this.supplierorders.find((x: { inventoryId: Number; }) => x.inventoryId == selecteditem.inventoryId) == undefined)
      {
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure you want to delete this inventory item?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.deleteInventory(selecteditem).subscribe();
            this.router.navigate(['/read-inventory']).then(() => {
            window.location.reload();
            });
          }
        })  
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Inventory Assoiciated to other entries',
            showDenyButton: false,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
      })
    })
    })
  }
}
