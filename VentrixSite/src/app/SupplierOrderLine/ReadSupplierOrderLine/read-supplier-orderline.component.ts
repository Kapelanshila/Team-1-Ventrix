import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from 'src/app/shared/Supplier';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { InventoryVM } from 'src/app/shared/InventoryVM';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { SupplierOrderVM } from 'src/app/shared/SupplierOrderVM';
import { style } from '@angular/animations';
import { SupplierOrderLineVM } from 'src/app/shared/SupplierOrderLineVM';
import { SupplierOrderLine } from 'src/app/shared/SupplierOrderLine';
import { SupplierResponse } from 'src/app/shared/SupplierResponse';
@Component({
  selector: 'app-read-Supplier-orderline',
  templateUrl: './read-Supplier-orderline.component.html',
  styleUrls: ['./read-Supplier-orderline.component.css']
})
export class ReadSupplierOrderlineComponent implements OnInit {
  
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router)  { }
  inventories:any[] = [];
  warehouses:any[] = [];
  suppliers:any[] = [];
  types:any[] = [];
  supplierorderline:any[] = [];
  Supplierorderline:any[] = [];
  categories:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  item!:SupplierOrderLineVM;
  type:any;
  inventoryItems:any[] = [];
  selectedorder!:SupplierOrderVM;
  selectedinventories: SupplierOrderLineVM[] = [];
  quantity!: number;
  invalid = 0;
  novalue = 0;
  found = false;
  //Search query 
  query:string = '';
  selectedOrders: SupplierOrderLine[] = [];
  order!:SupplierOrderLine;
  response!:SupplierResponse;
  ngOnInit(): void {

    this.selectedinventories = [];
    this.selectedorder = this.ventrixdbservice.getSupplierOrder()!;
    this.inventoryItems =[];
      
    this.selectedinventories.forEach(element => {
      this.inventoryItems.push(element)
    });
  
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
                  
                  if (this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)
                  {
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
                    quantity: 0,
                    selected:false,    
                    added:false           
                  }
                  this.inventoryItems.push(this.item)
                  }
   
                })

              })

            })
            
        })

      });

    })
  }

  addQuantity(event:any, selectedinventory:SupplierOrderLineVM)
  {  
    this.selectedinventories.find(x => x.inventoryId == selectedinventory.inventoryId)!.added = false;
    //Validation in the event the user enters an invalid number 
    if (event.target.value <= 0)
    {
      this.selectedinventories.find(x => x.inventoryId == selectedinventory.inventoryId)!.quantity = event.target.value;

      this.selectedinventories.find(x => x.inventoryId == selectedinventory.inventoryId)!.added = true;
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Number Entered',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else
    {
      this.selectedinventories.find(x => x.inventoryId == selectedinventory.inventoryId)!.quantity = event.target.value;
      Swal.fire({
        icon: 'success',
        title: 'Quantity Successfully Added',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
  }

  selected(event:any, selectedinventory:SupplierOrderLineVM) {
    if ( event.target.checked ) {
      this.item = 
      {
        inventoryId: selectedinventory.inventoryId,
        warehouse :selectedinventory.warehouse,
        type:selectedinventory.type,
        category :selectedinventory.category,
        supplier:selectedinventory.supplier,
        name: selectedinventory.name,
        quantityOnHand: selectedinventory.quantityOnHand,
        quantity: 0,
        selected:true,    
        added:false                   
      }
      this.selectedinventories.push(this.item);
      this.inventoryItems =[];
      
      this.selectedinventories.forEach(element => {
        this.inventoryItems.push(element)
      });
    
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
                  
                  if (this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)
                  {
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
                    quantity: 0,
                    selected:false ,    
                    added:false                       
                  }
                    this.inventoryItems.push(this.item)
                    
                  }  
                })

              })

            })
            
        })

      });
    })

   }
   else
   {
    this.selectedinventories.splice(this.selectedinventories.indexOf(selectedinventory), 1);
    this.inventoryItems = [];

    this.selectedinventories.forEach(element => {
      this.inventoryItems.push(element)
    });
  

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
                  if (this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)
                  {
              
                    if (this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)                    
                    {
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
                      quantity: 0,
                      selected:false,    
              added:false                        
                    }
                    this.inventoryItems.push(this.item)
                    }
  
                  }

                  
                })

              })

            })
            
        })

      });
    })

   }
}

  addInventory()
  {
    this.invalid = 0;
    this.novalue = 0;

    //Validation to ensure no inventory has invalid values
    this.selectedinventories.forEach(element => {
      if (element.quantity <= 0)
      {   
        this.invalid++;
      }
    });

        
    //Validation to all inventory selected has values
    this.selectedinventories.forEach(element => {
      if (element.quantity == 0)
      {   
        this.novalue++;
      }
    });
  
    if (this.novalue != 0)
    {
      Swal.fire({
        icon: 'error',
        title: this.novalue+' Inventory Item(s) Have No Value',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else if (this.invalid != 0)
    {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Quantity Value(s) detected',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    
    if(this.novalue ==0 && this.invalid ==0)
    {
      this.selectedinventories.forEach(element => {
        this.order = 
        {
          inventoryId :element.inventoryId,
          warehouseId :element.warehouse?.warehouseId,
          inventoryTypeId:element.type?.inventoryTypeId,
          categoryId:element.category?.inventoryCategoryId,
          name:element.name,
          supplierId:element.supplier?.supplierId,
          quantityOnHand:element.quantityOnHand,
          quantity: element.quantity
        }
        this.selectedOrders.push(this.order)
      });

      this.response =
      {
        inventories: this.selectedOrders,
        order: this.selectedorder
      }
      Swal.fire({
        icon: 'success',
        title: 'Inventory Successfully Loaded to Supplier Order',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.createSupplierOrderLine(this.response).subscribe();
          this.router.navigate(['/read-supplierorder']).then(() => {
            window.location.reload();
          });
        }
      })   

    }
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
            }) 
          }
          else 
          {
            this.selectedorder = this.ventrixdbservice.getSupplierOrder()!;
            this.inventoryItems =[];
              
            this.selectedinventories.forEach(element => {
              this.inventoryItems.push(element)
            });
          
            //Get inventory from api
            this.ventrixdbservice.searchInventory(this.query.toString())
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
                 
                          if (this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)                          {
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
                            quantity: 0,
                            selected:false,    
                            added:false                        
                          }
                          this.inventoryItems.push(this.item)
                          }
        
                 
                        })
        
                      })
        
                    })
                    
                })
        
              });
        
            })
              }
            })
          }  
}

}
