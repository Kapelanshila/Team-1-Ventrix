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
  supplier:Supplier|undefined;
  order!: SupplierOrderVM;
  orderstatus!:SupplierOrderVM;
  inventories: any[] =[];
  item!: InventoryPopup;
  supplierorderlines: any[] = [];
  orders: any[] = [];
  Supplierorderlines: any[] = [];
  value: any[] = [];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { }
  //Modal
  displayStyle = "none";
  idisplayStyle = "none";

  
      //Modal Open and Close Functions
      //Dispays Inventory for a Supplier Order but only for Supplier orders that have been proccessed 
      openInventoryPopup(selectedSupplierOrder: SupplierOrderVM) {
        this.orders = [];
        this.ventrixdbservice.readSupplierOrderLine()
        .subscribe(response => {
          this.Supplierorderlines = response;
    

          this.ventrixdbservice.readInventory()
          .subscribe(response => {
            this.inventories = response;
       
            this.Supplierorderlines.forEach(element => {
              if (element.supplierOrderId == selectedSupplierOrder.supplierOrderId)
              {

                this.item =
                {
                  name: this.inventories.find(x => x.inventoryId == element.inventoryId).name,
                  date: element.date,
                  quantity: element.quantity
                }
               this.orders.push(this.item)
              }
       
            });
            this.idisplayStyle = "block";
          })
        })
      }

      closeInventoryPopup() {
        this.idisplayStyle = "none";
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
                console.log(this.supplierOrderVM)
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

  editSupplierOrder(selectedSupplierOrder: SupplierOrderVM)
  {
    this.ventrixdbservice.setSupplierOrder(selectedSupplierOrder);
    this.router.navigate(['/update-supplierorder']);  
  }

  deleteSupplierOrder(selectedSupplierOrder: SupplierOrderVM)
  {
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
                      inventories: this.supplierorderlines.find(x => x.supplierOrderId == supplierorder.supplierOrderId).length
                    }
                    this.supplierOrderVM.push(this.order);
                    console.log(this.supplierOrderVM)
        
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
