import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { ClientOrder } from 'src/app/shared/ClientOrder';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { InventoryPopup } from 'src/app/shared/InventoryPopUp';
import { Inventory } from 'src/app/shared/Inventory';
import { InventoryVM } from 'src/app/shared/InventoryVM';

@Component({
  selector: 'app-read-client-order',
  templateUrl: './read-client-order.component.html',
  styleUrls: ['./read-client-order.component.css']
})
export class ReadClientOrderComponent implements OnInit {
  p: number = 1;
  config: any; 
  noOfRows = 10;
  //Search query 
  query:string = '';
  clientOrders:ClientOrder[] = [];
  completed:ClientOrderVM[] = [];
  clientOrderVM:ClientOrderVM[] = [];
  temp!:ClientOrderStatus;
  clientOrdersStatuses:ClientOrderStatus[] = [];
  clients:Client[] = [];
  client:Client|undefined;
  order!: ClientOrderVM;
  orderstatus!:ClientOrderVM;
  statuses: ClientOrderStatus[] = [];
  inventories: any[] =[];
  clientorderlines: any[] = [];
  orders: any[] = [];
  filterOrder:ClientOrderVM[] = [];
  status: string = "";
  readstatuses: any[] = [];
  invetoryselected=false;
  clientselected=false;
  statusselected=false;
  inventoryitems:Inventory[] = [];
  idselected!:any;
  Iitem!:InventoryVM;
  warehouses:any[] = [];
  suppliers:any[] = [];
  types:any[] = [];
  supplierorderline:any[] = [];
  clientorderline:any[] = [];
  categories:any[] = [];
  item!:InventoryVM;
  type:any;
  inventoryItems:any[] = [];
  inventorywriteoffs!:any;
  clientorders!:any;
  supplierorders!:any;
  inventory:any;
  
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { }
  //Modal
  displayStyle = "none";
  idisplayStyle = "none";

      //Modal Open and Close Functions
      openPopup(selectedClientOrder: ClientOrderVM) {
        this.idselected = selectedClientOrder.clientOrderId;
        this.statuses = [];

        if(this.statusselected == false)
        {
          this.invetoryselected = false;
          this.clientselected = false;
          this.statusselected = true;
          
        this.orderstatus = selectedClientOrder;
        this.ventrixdbservice.readClientOrderStatuses()
        .subscribe(response => {
          //Uses earliest date of status to get current status
          this.statuses = [];
          response.forEach(element => {
            if (element.clientOrderId == selectedClientOrder.clientOrderId)
            {
              this.statuses.push(element)
            }
          });
        })
      }
      else
      {
        this.statusselected = false;
        this.statuses = [];
      }
      }


      //Modal Open and Close Functions
      //Dispays Inventory for a Client Order but only for client orders that have been proccessed 
      openInventoryPopup(selectedClientOrder: ClientOrderVM) {
        this.idselected = selectedClientOrder.clientOrderId;
        this.inventoryitems = [];
        this.orders = [];

        if(this.invetoryselected == false)
        {
          this.invetoryselected = true;
          this.clientselected = false;
          this.statusselected = false;
          
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => {
            this.clientorderlines = response;

            this.ventrixdbservice.readInventory()
            .subscribe(response => {
              this.inventories = response;

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
                      
                            this.clientorderlines.forEach(element => {
                              if (element.clientOrderId == selectedClientOrder.clientOrderId)
                              {
                                this.inventory = this.inventories.find(x => x.inventoryId == element.inventoryId);
                                  //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item

                  
                              this.type = this.types.find(x => x.inventoryTypeId == this.inventory.inventoryTypeId);

                                //New inventory view model is assigned the retrived values from the api
                                this.Iitem = 
                                {
                                  inventoryId: this.inventory.inventoryId,
                                  warehouse :this.warehouses.find(x => x.warehouseId == this.inventory.warehouseId),
                                  type:this.types.find(x => x.inventoryTypeId == this.inventory.inventoryTypeId),
                                  category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                                  supplier:this.suppliers.find(x => x.supplierId == this.inventory.supplierId),
                                  name: this.inventory.name,
                                  quantityOnHand: element.quantity
                                }
                                this.inventoryItems.push(this.Iitem)                    
                        }
                      })
                    })
                  })
                })   
              })
            })
          }); 
        }
        else
        {
          this.invetoryselected = false;
          this.inventoryItems = [];
        }
      }

      help()
      {
        this.ventrixdbservice.setPage(107);
        this.router.navigate(['/help']).then(() => {
          });
      }

      openClientPopup(selectedClientOrder: ClientOrderVM) 
      {
        this.idselected = selectedClientOrder.clientOrderId;

        if(this.clientselected == false)
        {
          this.invetoryselected = false;
          this.clientselected = true;
          this.statusselected = false;
          this.ventrixdbservice.readClient()
          .subscribe(response => {
            this.client = response.find( x => x.clientId == selectedClientOrder.clientId)!;
          })
        }
        else
        {
          this.clientselected = false;
        }
        
      }

      closeInventoryPopup() {
        this.idisplayStyle = "none";
      }
    
  ngOnInit(): void
  {
    this.orderstatus = 
    {
      clientOrderId: 0,
      clientId: 0,
      description :'',
      clientInvoice: '',
      contactPersonName : '',
      contactPersonSurname: '',
      emailAddress: '',
      status: '',
      encrypted:''
    }

    this.ventrixdbservice.clearClientOrder();
    this.ventrixdbservice.readClientOrder()
    .subscribe(response => {
      this.clientOrders = response;
      
        //Neccessary to get the most up-to-date status
        if (this.clientOrders.length != 0)
        {
          this.clientOrders.forEach(clientorder => {
          this.clientOrdersStatuses = [];

          this.ventrixdbservice.readClient()
          .subscribe(response => {
            response.forEach(element => {
             if (element.clientId == clientorder.clientId)
             {
          
              this.ventrixdbservice.readClientOrderStatuses()
              .subscribe(response => {
                //Uses earliest date of status to get current status
                this.clientOrdersStatuses = [];
                response.forEach(element => {
                  if (element.clientOrderId == clientorder.clientOrderId)
                  {
                    this.clientOrdersStatuses.push(element)
                  }
                });
             
                let temp = Date.parse(this.clientOrdersStatuses[0].date.toString());

                this.clientOrdersStatuses.forEach(status => {

                  let current = Date.parse(status.date.toString());

                  if (temp <= current)
                  {
                    this.temp = status
                  }
                });
          

                this.order = 
                {
                  clientOrderId: clientorder.clientOrderId,
                  clientId: element.clientId,
                  description :clientorder.description,
                  clientInvoice: clientorder.clientInvoice,
                  contactPersonName : element.contactPersonName!,
                  contactPersonSurname: element.contactPersonSurname!,
                  emailAddress: element.emailAddress!,
                  status: this.temp.description,
                  encrypted:''
                }
                this.clientOrderVM.push(this.order);
            })
            this.filterOrder = this.clientOrderVM;
             }
           });

          });
        });
      }
    })
  }

  filter()
  {
    this.filterOrder = [];
    if (this.status == "")
    {
      this.filterOrder = this.clientOrderVM;
    }
    else
    {
      this.clientOrderVM.forEach(element => {
        if (element.status == this.status)
        {
          this.filterOrder.push(element)
        }
      });
      if (this.filterOrder.length == 0)
      {
        Swal.fire({
          icon: 'info',
          title: 'No orders found',
          showDenyButton: false,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-clientorder']).then(() => {
            window.location.reload();
            });
          }
        })  
      }
    }
  }



  refresh()
  {
    this.router.navigate(['/read-clientorder']).then(() => {
      window.location.reload();
    });
  }

  editClientOrder(selectedClientOrder: ClientOrderVM)
  {
    this.ventrixdbservice.setClientOrder(selectedClientOrder);
    this.router.navigate(['/update-clientorder']);  
  }

  deleteClientOrder(selectedClientOrder: ClientOrderVM)
  {
    if (selectedClientOrder.status == "Added" || selectedClientOrder.status == "Processed" || selectedClientOrder.status == "Packed")
    {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this client order?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteClientOrderInvoice(selectedClientOrder.clientInvoice.toString()).subscribe();
          this.ventrixdbservice.deleteClientOrder(selectedClientOrder).subscribe();
          this.router.navigate(['/read-clientorder']).then(() => {
          window.location.reload();
          });
        }
      })  
    }
    else
    {
      Swal.fire({
        icon: 'warning',
        title: 'Client Order Associated to other entries',
        showDenyButton: false,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
  }
  
  download(selectedClientOrder: ClientOrderVM)
  {
    this.ventrixdbservice.dowloadFile(selectedClientOrder.clientInvoice.toString())
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
     saveAs(data, selectedClientOrder.clientInvoice.toString());
   });
  }
  
  addClientOrder()
  {
    this.router.navigate(['/create-clientorder']);  
  }

  completedOrders()
  {
    this.router.navigate(['/completed-orders']); 
  }

  addInventory(selectedClientOrder: ClientOrderVM)
  {
    if (selectedClientOrder.status != "Added")
    {
      Swal.fire({
        icon: 'warning',
        title: 'Unable to add inventory to client order',
        text: 'Please edit the Client Order to change loaded inventory',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else
    {
      this.ventrixdbservice.setClientOrder(selectedClientOrder);
      this.router.navigate(['/read-clientorderline']);  
    }
  }

  searchClientOrder()
  { 
    this.clientOrderVM = []

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
            this.router.navigate(['/read-clientorder']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
      else
      {
          this.ventrixdbservice.searchClientOrder(this.query.toString()).subscribe(response => {
            //Same Read as intializer
            this.clientOrders = response;
      
            //Neccessary to get the most up-to-date status
            if (this.clientOrders.length != 0)
            {
              this.clientOrders.forEach(clientorder => {
              this.clientOrdersStatuses = [];

              this.ventrixdbservice.readClientOrderStatuses()
              .subscribe(response => {
                this.readstatuses = response
    
              this.ventrixdbservice.readClient()
              .subscribe(response => {

                  response.forEach(element => {
                 if (element.clientId == clientorder.clientId)
                 {
                    //Uses earliest date of status to get current status
                    this.clientOrdersStatuses = [];
                    this.readstatuses.forEach(element => {
                      if (element.clientOrderId == clientorder.clientOrderId)
                      {
                        this.clientOrdersStatuses.push(element)
                      }
                    });
                 
                    let temp = Date.parse(this.clientOrdersStatuses[0].date.toString());
    
                    this.clientOrdersStatuses.forEach(status => {
    
                      let current = Date.parse(status.date.toString());
    
                      if (temp <= current)
                      {
                        this.temp = status
                      }
                    });
              
                    this.order = 
                    {
                      clientOrderId: clientorder.clientOrderId,
                      clientId: element.clientId,
                      description :clientorder.description,
                      clientInvoice: clientorder.clientInvoice,
                      contactPersonName : element.contactPersonName!,
                      contactPersonSurname: element.contactPersonSurname!,
                      emailAddress: element.emailAddress!,
                      status: this.temp.description,
                      encrypted:''
                    }
                    this.clientOrderVM.push(this.order);
                 }
               });
                
               if (this.status == "")
               {
                this.filterOrder = [];
                 this.filterOrder = this.clientOrderVM;
               }
               else
               {
                this.filterOrder = [];
                 this.clientOrderVM.forEach(element => {
                   if (element.status == this.status)
                   {
                     this.filterOrder.push(element)
                   }
                 });
                 if (this.filterOrder.length == 0)
                 {
                   Swal.fire({
                    icon: 'error',
                    title: 'Invalid Search',
                     showDenyButton: false,
                     confirmButtonText: 'Ok',
                     confirmButtonColor: '#077bff',
                     allowOutsideClick: false,
                     allowEscapeKey: false
                   }).then((result) => {
                     if (result.isConfirmed) {
                       this.router.navigate(['/read-clientorder']).then(() => {
                       window.location.reload();
                       });
                     }
                   })  
                 }
               }
              })
               //
              });
            });
          }      
          if (this.clientOrders.length == 0)
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
              this.router.navigate(['/read-clientorder']).then(() => {
                window.location.reload();
              });
            }
          })  
          }
        })
      }  
  }

}
function uppercase(status: String) {
  throw new Error('Function not implemented.');
}

