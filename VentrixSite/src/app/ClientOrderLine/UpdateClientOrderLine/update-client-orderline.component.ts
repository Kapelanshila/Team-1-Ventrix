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
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { style } from '@angular/animations';
import { ClientOrderLineVM } from 'src/app/shared/ClientOrderLineVM';
import { ClientOrderLine } from 'src/app/shared/ClientOrderLine';
import { ClientResponse } from 'src/app/shared/ClientResponse';
import { Inventory } from 'src/app/shared/Inventory';
import { ClientOrderLineUVM } from 'src/app/shared/ClientOrderLineUVM';
import { ClientResponseU } from 'src/app/shared/ClientResponseU';
@Component({
  selector: 'app-update-client-orderline',
  templateUrl: './update-client-orderline.component.html',
  styleUrls: ['./update-client-orderline.component.css']
})

export class UpdateClientOrderlineComponent implements OnInit {
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router)  { }
  inventories:any[] = [];
  warehouses:any[] = [];
  suppliers:any[] = [];
  types:any[] = [];
  clientorderline:any[] = [];
  categories:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  item!:ClientOrderLineUVM;
  type:any;
  inventoryItems:ClientOrderLineUVM[] = [];
  selectedorder!:ClientOrderVM;
  selectedinventories: ClientOrderLineUVM[] = [];
  quantity!: number;
  invalid = 0;
  novalue = 0;
  duplicates = 0;
  found = false;
  //Search query 
  query:string = '';
  selectedOrders: ClientOrderLineUVM[] = [];
  order!:ClientOrderLineUVM;
  response!:ClientResponseU;
  clientorderlines:any[] = [];
  inventoryitem!: Inventory;
  storedinventories: ClientOrderLineUVM[] = [];
  notstoredinventories: ClientOrderLineUVM[] = [];

  categoryselected!:any;
  typeselected!:any;
  filtertypes:any;
  filteritems:any[] = [];
  
  ngOnInit(): void {
      this.selectedorder = this.ventrixdbservice.getClientOrder()!;
      this.inventoryItems =[];
      
      this.ventrixdbservice.readClientOrderLine()
      .subscribe(response => {
        this.clientorderlines = response;


        this.ventrixdbservice.readInventory()
        .subscribe(response => {
          this.inventories = response;

            
          this.ventrixdbservice.readWarehouse()
          .subscribe(response => {
            this.warehouses = response;

            this.ventrixdbservice.readInventoryCategory()
            .subscribe(response => {
              this.categories = response;

              this.ventrixdbservice.readInventoryType()
              .subscribe(response => {
                this.types = response;

                this.ventrixdbservice.readSupplier()
                .subscribe(response => {
                  this.suppliers = response;
  
                  //On initialization inventory item stored in client order line are put into an array so that the user can edit already stored data
                  this.clientorderlines.forEach(element => {    
                  this.inventoryitem = this.inventories.find(x => x.inventoryId == element.inventoryId)
                  this.type = this.types.find(x => x.inventoryTypeId == this.inventoryitem.inventoryTypeId);

                      if (this.selectedorder.clientOrderId == element.clientOrderId)
                      {
                        this.item = 
                        {
                          clientOrderLineId: element.clientOrderLineId,
                          inventoryId: element.inventoryId,
                          warehouse :this.warehouses.find(x => x.warehouseId == this.inventoryitem.warehouseId),
                          type:this.types.find(x => x.inventoryTypeId == this.inventoryitem.inventoryTypeId),
                          category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                          supplier:this.suppliers.find(x => x.supplierId == this.inventoryitem.supplierId),
                          name:this.inventoryitem.name,
                          quantityOnHand: this.inventoryitem.quantityOnHand,
                          quantity: element.quantity,
                          selected:true,    
                          added:false,  
                          stored: true         
                        }
                      this.selectedinventories.push(this.item)
                    }
                });
                
                //In the event the user removes everything
                if (this.selectedinventories.length == 0)
                {
                  Swal.fire({
                    icon: 'info',
                    title: 'All selected inventory from client order removed',
                    text:'Reverting status of client order...',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#077bff',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      this.ventrixdbservice.revertStatus(this.selectedorder).subscribe();
                      this.router.navigate(['/read-clientorder']).then(() => {
                        window.location.reload();
                      });
                    }
                  })
                }

                //Here it is put into another array as selected inventories array is strictly for inventory selected to be loaded
                this.selectedinventories.forEach(element => {
                  this.inventoryItems.push(element)
                  this.filteritems.push(element)
                });
              
                this.inventories.forEach(inventory => {
                  if (inventory.quantityOnHand > 0 && this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)
                  {

                  //New inventory view model is assigned the retrived values from the api
                  this.item = 
                  {
                    clientOrderLineId: 0,
                    inventoryId: inventory.inventoryId,
                    warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                    type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                    category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                    supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                    name: inventory.name,
                    quantityOnHand: inventory.quantityOnHand,
                    quantity: 0,
                    selected:false,    
                    added:false,
                    stored: false
                  }
                  this.inventoryItems.push(this.item)
                  this.filteritems.push(this.item)
                  }
                });
      
              })
            })
          })
        })
      })
    })
  }  

  deleteClientOrderLine(selectedinventory:ClientOrderLineUVM)
  {
    Swal.fire({
      icon: 'success',
      title: 'Inventory Successfully Removed',
      confirmButtonText: 'OK',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.ventrixdbservice.deleteClientOrderLine(selectedinventory).subscribe();
        this.router.navigate(['/update-clientorderline']).then(() => {
          window.location.reload();
        });
      }
    })
  }

  
  filtercategory()
  {
    this.filteritems = [];
    if (this.categoryselected == "")
    {
      this.filteritems = this.inventoryItems;
    }
    else
    {
      this.inventoryItems.forEach(element => {
        if (element.selected == true)
        {
          this.filteritems.push(element);
        }
  
        else if (element.category!.inventoryCategoryId == this.categoryselected)
        {
          this.filteritems.push(element);
        }
      });
    }
  }

  filtertype()
  {
    this.filteritems = [];
    if (this.typeselected == "")
    {
      this.filtercategory();
    }
    else
    {
      this.inventoryItems.forEach(element => {
        if (element.selected == true)
        {
          this.filteritems.push(element);
        }
  
        else if (element.type!.inventoryTypeId == this.typeselected)
        {
          this.filteritems.push(element);
        }
      });
    }
  }

  getTypes()
  {
    //Populate Select Box
    this.filtertypes = [];
    if(this.categoryselected != "")
    {
      this.filtercategory()
      this.ventrixdbservice.readInventoryType()
      .subscribe(response => {
        response.forEach(element => {
          if (element.inventoryCategoryId == this.categoryselected)
          {
            this.filtertypes.push(element);
          }
        });
      })    
    }
    else
    {
      this.filtercategory()
    }
  }


  addQuantity(event:any, selectedinventory:ClientOrderLineUVM)
  {  
    this.selectedinventories.find(x => x.inventoryId == selectedinventory.inventoryId)!.added = false;
    //Validation in the event the user enters an invalid number 
    if (event.target.value > selectedinventory.quantityOnHand! || event.target.value <= 0)
    {
      this.selectedinventories.find(x => x.inventoryId == selectedinventory.inventoryId)!.quantity = event.target.value;

      this.selectedinventories.find(x => x.inventoryId == selectedinventory.inventoryId)!.added = true;
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Quantity Entered',
        text: 'Quantity is higher than stock on hand',
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

  selected(event:any, selectedinventory:ClientOrderLineUVM) {
    this.categoryselected = "";
    this.filtertypes = [];
    if ( event.target.checked ) {
      this.item = 
      {
        clientOrderLineId: 0,
        inventoryId: selectedinventory.inventoryId,
        warehouse :selectedinventory.warehouse,
        type:selectedinventory.type,
        category :selectedinventory.category,
        supplier:selectedinventory.supplier,
        name: selectedinventory.name,
        quantityOnHand: selectedinventory.quantityOnHand,
        quantity: 0,
        selected:true,    
        added:false,
        stored: false                
      }
      this.selectedinventories.push(this.item);
      this.inventoryItems =[];
      this.filteritems = [];
      
      this.selectedinventories.forEach(element => {
        this.inventoryItems.push(element)
        this.filteritems.push(element)

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
                  
                  if (inventory.quantityOnHand > 0 && this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)
                  {
                  //New inventory view model is assigned the retrived values from the api
                  this.item = 
                  {
                    clientOrderLineId: 0,
                    inventoryId: inventory.inventoryId,
                    warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                    type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                    category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                    supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                    name: inventory.name,
                    quantityOnHand: inventory.quantityOnHand,
                    quantity: 0,
                    selected:false ,    
                    added:false,
                    stored: false                 
                  }
                  this.inventoryItems.push(this.item)
                  this.filteritems.push(this.item)

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
              
                    if (inventory.quantityOnHand > 0 && this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)                  if (inventory.quantityOnHand > 0 && this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)                    {
                    //New inventory view model is assigned the retrived values from the api
                    this.item = 
                    {
                      clientOrderLineId: 0,
                      inventoryId: inventory.inventoryId,
                      warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                      type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                      category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                      supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                      name: inventory.name,
                      quantityOnHand: inventory.quantityOnHand,
                      quantity: 0,
                      selected:false ,    
                      added:false,
                      stored: false    
                    }
                    this.inventoryItems.push(this.item)
                    this.filteritems.push(this.item)

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

    this.ventrixdbservice.readClientOrderLine()
    .subscribe(response => {
      this.clientorderlines = response;
      this.selectedinventories.forEach(element => {
        if (this.clientorderlines.find(x => x.clientOrderLineId == element.clientOrderLineId) != undefined && element.quantity == this.clientorderlines.find(x => x.clientOrderLineId == element.clientOrderLineId).quantity)
        {
          this.duplicates++;
          this.storedinventories.push(element);
        }
        else
        {
          this.notstoredinventories.push(element);
        }

      });

      if (this.duplicates == this.storedinventories.length && this.notstoredinventories.length == 0)
      {
        Swal.fire({
          icon: 'info',
          title: 'No changes Made',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
      else
      {
 
    //Validation to ensure no inventory has invalid values
    this.selectedinventories.forEach(element => {
      if (element.quantity <= 0 || element.quantity > element.quantityOnHand!)
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
          clientOrderLineId: element.clientOrderLineId,
          inventoryId :element.inventoryId,
          warehouse :element.warehouse,
          type:element.type,
          category:element.category,
          name:element.name,
          supplier:element.supplier,
          quantityOnHand:element.quantityOnHand,
          quantity: element.quantity,
          added: element.added,
          selected: element.selected,
          stored: element.stored
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
        title: 'Inventory Successfully Updated',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      .then((result) => {
        if (result.isConfirmed) {

          this.ventrixdbservice.updateClientOrderLine(this.response).subscribe();
          this.router.navigate(['/read-clientorder']).then(() => {
            window.location.reload();
          });
        }
      })   

    }
      }
    })
  }

  searchInventory()
  { 
    this.categoryselected = "";
    this.filtertypes = [];
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
            this.selectedorder = this.ventrixdbservice.getClientOrder()!;
            this.inventoryItems =[];
            this.filteritems = [];
              
            this.selectedinventories.forEach(element => {
              this.inventoryItems.push(element)
              this.filteritems.push(element)
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
                 
                          if (inventory.quantityOnHand > 0 && this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)                          {
                          //New inventory view model is assigned the retrived values from the api
                          this.item = 
                          {
                            clientOrderLineId: 0,
                            inventoryId: inventory.inventoryId,
                            warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                            type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                            category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                            supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                            name: inventory.name,
                            quantityOnHand: inventory.quantityOnHand,
                            quantity: 0,
                            selected:false ,    
                            added:false,
                            stored: false                         
                          }
                          this.inventoryItems.push(this.item)
                          this.filteritems.push(this.item)

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
