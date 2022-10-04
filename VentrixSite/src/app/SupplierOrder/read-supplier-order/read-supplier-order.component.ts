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
import { SupplierOrder } from 'src/app/shared/SupplierOrder';
import { SupplierOrderVM } from 'src/app/shared/SupplierOrderVM';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { InventoryPopup } from 'src/app/shared/InventoryPopUp';
import { Supplier } from 'src/app/shared/Supplier';
import { ClientOrder } from 'src/app/shared/ClientOrder';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { Inventory } from 'src/app/shared/Inventory';
import { InventoryVM } from 'src/app/shared/InventoryVM';

@Component({
  selector: 'app-read-supplier-order',
  templateUrl: './read-supplier-order.component.html',
  styleUrls: ['./read-supplier-order.component.css']
})
export class ReadSupplierOrderComponent implements OnInit {
  p: number = 1;
  config: any; 
  noOfRows = 10;
  //Search query 
  query:string = '';
  supplierOrders:SupplierOrder[] = [];
  supplierOrderVM:SupplierOrderVM[] = [];
  suppliers:Supplier[] = [];
  supplierorderline:any[] = [];
  supplier:Supplier|undefined;
  order!: SupplierOrderVM;
  orderstatus!:SupplierOrderVM;
  inventories: any[] =[];
  item!: InventoryPopup;
  supplierorderlines: any[] = [];
  orders: any[] = [];
  Supplierorderlines: any[] = [];
  value: any[] = [];
  //Search query 
  clientOrders:ClientOrder[] = [];
  completed:ClientOrderVM[] = [];
  clientOrderVM:ClientOrderVM[] = [];
  temp!:ClientOrderStatus;
  clientOrdersStatuses:ClientOrderStatus[] = [];
  clients:Client[] = [];
  client:Client|undefined;
  statuses: ClientOrderStatus[] = [];
  clientorderlines: any[] = [];
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
  types:any[] = [];
  clientorderline:any[] = [];
  categories:any[] = [];
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

  
     openInventoryPopup(selectedSupplierOrder: SupplierOrderVM) {
        this.idselected = selectedSupplierOrder.supplierOrderId;
        this.inventoryitems = [];
        this.orders = [];

        if(this.invetoryselected == false)
        {
          this.invetoryselected = true;
          this.clientselected = false;
          this.statusselected = false;
          
          this.ventrixdbservice.readSupplierOrderLine()
          .subscribe(response => {
            this.supplierorderlines = response;

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
                      
                            this.supplierorderlines.forEach(element => {
                              if (element.supplierOrderId == selectedSupplierOrder.supplierOrderId)
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

    
  ngOnInit(): void
  {
    this.ventrixdbservice.clearSupplierOrder();

    this.ventrixdbservice.readSupplierOrder()
    .subscribe(response => {
      this.supplierOrders = response;

      this.ventrixdbservice.readSupplierOrderLine()
      .subscribe(response => {
        this.Supplierorderlines = response;

        //Neccessary to get the most up-to-date status
        if (this.supplierOrders.length != 0)
        {
          this.supplierOrders.forEach(supplierorder => {

          this.ventrixdbservice.readSupplier()
          .subscribe(response => {
            response.forEach(element => {
      
             if (element.supplierId == supplierorder.supplierId && this.Supplierorderlines.find(x => x.supplierOrderId == supplierorder.supplierOrderId) == undefined)
             {
                this.order = 
                {
                  supplierOrderId: supplierorder.supplierOrderId,
                  supplierId: element.supplierId,
                  description :supplierorder.description,
                  supplierInvoice: supplierorder.supplierInvoice,
                  contactPersonName : element.contactPersonName!,
                  emailAddress: element.emailAddress!,
                  inventories: false
                }
                this.supplierOrderVM.push(this.order);
             }
             else if (element.supplierId == supplierorder.supplierId && this.Supplierorderlines.find(x => x.supplierOrderId == supplierorder.supplierOrderId) != undefined)
             {
              this.order = 
              {
                supplierOrderId: supplierorder.supplierOrderId,
                supplierId: element.supplierId,
                description :supplierorder.description,
                supplierInvoice: supplierorder.supplierInvoice,
                contactPersonName : element.contactPersonName!,
                emailAddress: element.emailAddress!,
                inventories: true
              }
              this.supplierOrderVM.push(this.order);
             }
           });

          });
        });
      }
    })
    })
  }

  help()
  {
    this.ventrixdbservice.setPage(112);
    this.router.navigate(['/help']).then(() => {
      });
  }


  editSupplierOrder(selectedSupplierOrder: SupplierOrderVM)
  {
    this.ventrixdbservice.setSupplierOrder(selectedSupplierOrder);
    this.router.navigate(['/update-supplierorder']);  
  }

  deleteSupplierOrder(selectedSupplierOrder: SupplierOrderVM)
  {
    this.ventrixdbservice.readSupplierOrderLine().subscribe(response => {
      this.supplierorderlines = response;

      if (this.supplierorderlines.find((x: { supplierOrderId: Number; }) => x.supplierOrderId == selectedSupplierOrder.supplierOrderId) == undefined)
      {
          //Sweet alerts are used as notifications
          Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to delete this supplier order?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.ventrixdbservice.deleteSupplierOrderInvoice(selectedSupplierOrder.supplierInvoice.toString()).subscribe();
              this.ventrixdbservice.deleteSupplierOrder(selectedSupplierOrder).subscribe();
              this.router.navigate(['/read-supplierorder']).then(() => {
              window.location.reload();
              });
            }
          })  
          }
          else
          {
            Swal.fire({
              icon: 'warning',
              title: 'Supplier Order Associated to other entries',
              text: 'Inventory Items associated to Supplier Order',
              showDenyButton: false,
              confirmButtonText: 'Ok',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            })
          }
        })
  }
  
  download(selectedSupplierOrder: SupplierOrderVM)
  {
    this.ventrixdbservice.dowloadSupplierFile(selectedSupplierOrder.supplierInvoice.toString())
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
     saveAs(data, selectedSupplierOrder.supplierInvoice.toString());
   });
  }
  
  addSupplierOrder()
  {
    this.router.navigate(['/create-supplierorder']);  
  }

  addInventory(selectedSupplierOrder: SupplierOrderVM)
  {

    if (selectedSupplierOrder.inventories == true)
    {
      Swal.fire({
        icon: 'warning',
        title: 'Unable to add inventory to supplier order',
        text: 'Please edit the Supplier Order to change loaded inventory',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else
    {
      this.ventrixdbservice.setSupplierOrder(selectedSupplierOrder);
      this.router.navigate(['/read-supplierorderline']);  
    }
  }

  searchSupplierOrder()
  { 
    this.supplierOrderVM = []
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
            this.router.navigate(['/read-supplierorder']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
      else
      {
          this.ventrixdbservice.searchSupplierOrder(this.query.toString()).subscribe(response => {
            //Same Read as intializer
            this.supplierOrders = response;
            this.ventrixdbservice.readSupplierOrderLine()
            .subscribe(response => {
              this.Supplierorderlines = response;
              
            //Neccessary to get the most up-to-date status
            if (this.supplierOrders.length != 0)
            {
              this.supplierOrders.forEach(supplierorder => {    
              this.ventrixdbservice.readSupplier()
              .subscribe(response => {
                response.forEach(element => {
                 if (element.supplierId == supplierorder.supplierId)
                 {             
                    this.order = 
                    {
                      supplierOrderId: supplierorder.supplierOrderId,
                      supplierId: element.supplierId,
                      description :supplierorder.description,
                      supplierInvoice: supplierorder.supplierInvoice,
                      contactPersonName : element.contactPersonName!,
                      emailAddress: element.emailAddress!,
                      inventories: true
                    }
                    this.supplierOrderVM.push(this.order);
        
                 }
     
               });
              });
            });
          }      
          if (this.supplierOrders.length == 0)
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
              this.router.navigate(['/read-supplierorder']).then(() => {
                window.location.reload();
              });
            }
          })  
          }
        })
      })
      }  
  }

}
