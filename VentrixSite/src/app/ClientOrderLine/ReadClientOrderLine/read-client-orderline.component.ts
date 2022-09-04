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
@Component({
  selector: 'app-read-client-orderline',
  templateUrl: './read-client-orderline.component.html',
  styleUrls: ['./read-client-orderline.component.css']
})
export class ReadClientOrderlineComponent implements OnInit {
  
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
  item!:ClientOrderLineVM;
  type:any;
  inventoryItems:any[] = [];
  selectedorder!:ClientOrderVM;
  selectedinventories: ClientOrderLineVM[] = [];
  quantity!: number;
  invalid = 0;
  novalue = 0;
  disabled = false;
  found = false;
  //Search query 
  query:string = '';
  selectedOrders: ClientOrderLine[] = [];
  order!:ClientOrderLine;
  response!:ClientResponse;

  categoryselected!:any;
  typeselected!:any;
  filtertypes:any;
  filteritems:any[] = [];
  
  ngOnInit(): void {

    this.selectedinventories = [];
    this.selectedorder = this.ventrixdbservice.getClientOrder()!;
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
                  
                  if (inventory.quantityOnHand > 0 && this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)
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
                  this.filteritems.push(this.item)

                  }
   
                })

              })

            })
            
        })

        
        if (this.inventories.length == 0)
        {
          this.disabled == true;
        }
  
  
      });


    })
  }

  addQuantity(event:any, selectedinventory:ClientOrderLineVM)
  {  
    this.selectedinventories.find(x => x.inventoryId == selectedinventory.inventoryId)!.added = false;
    //Validation in the event the user enters an invalid number 
    if (event.target.value > selectedinventory.quantityOnHand! || event.target.value <= 0)
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

  selected(event:any, selectedinventory:ClientOrderLineVM) {
    this.categoryselected = "";
    this.filtertypes = [];
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
      console.log(selectedinventory)
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
   
                  //New inventory view model is assigned the retrived values from the api
                  if (this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)
                  {
              
                    if (inventory.quantityOnHand > 0 && this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)                  if (inventory.quantityOnHand > 0 && this.selectedinventories.find(x => x.inventoryId == inventory.inventoryId) == undefined)                    {
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

    //Validation to ensure no inventory has invalid values
    this.selectedinventories.forEach(element => {
      if (element.quantity <= 0 || element.quantity > element.quantityOnHand!)
      {   
        this.invalid++;
      }
    });

        
    //Validation to all inventory selected has values
    this.selectedinventories.forEach(element => {
      console.log(element)
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
    else(this.selectedinventories.length == 0)
    {
      Swal.fire({
        icon: 'error',
        title: 'No inventory loaded',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    
    if(this.novalue ==0 && this.invalid ==0 && this.selectedinventories.length != 0)
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
        title: 'Inventory Successfully Loaded to Client Order',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.createClientOrderLine(this.response).subscribe();
          this.router.navigate(['/read-clientorder']).then(() => {
            window.location.reload();
          });
        }
      })   

    }
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
        console.log(this.filtertypes)
      })    
    }
    else
    {
      this.filtercategory()
    }
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
            this.filteritems = []
              
            this.selectedinventories.forEach(element => {
              this.inventoryItems.push(element)
              this.filteritems.push(element)
            });
          
            //Get inventory from api
            this.ventrixdbservice.searchInventory(this.query.toString())
            .subscribe(response => {
              console.log(response)
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
