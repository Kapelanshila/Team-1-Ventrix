import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { ClientOrder } from 'src/app/shared/ClientOrder';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { saveAs } from 'file-saver';
import { InventoryPopup } from 'src/app/shared/InventoryPopUp';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

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
  item!: InventoryPopup;
  clientorderlines: any[] = [];
  orders: any[] = [];

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

  //Modal
  displayStyle = "none";
  idisplayStyle = "none";

  ///Modal Open and Close Functions
      //Dispays Inventory for a Client Order but only for client orders that have been proccessed 
      openInventoryPopup(selectedClientOrder: ClientOrderVM) {
        this.orders = [];
        this.ventrixdbservice.readClientOrderLine()
        .subscribe(response => {
          this.clientorderlines = response;
          this.ventrixdbservice.readInventory()
          .subscribe(response => {
            this.inventories = response;
       
            this.clientorderlines.forEach(element => {
              if (element.clientOrderId == selectedClientOrder.clientOrderId)
              {
                this.item =
                {
                  name: this.inventories.find(x => x.inventoryId == element.inventoryId).name,
                  date: element.date,
                  quantity: element.quantity
                }
                this.orders.push(this.item);
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
          

                if (this.temp.description == 'Delivered')
                {
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
                  this.clientOrderVM.push(this.order)
                }
               
            })
             }
           });

          });
        });


      }
    })
  }

  refresh()
  {
    this.router.navigate(['/completed-orders']).then(() => {
      window.location.reload();
    });
  }

  help()
  {
    this.ventrixdbservice.setPage(129);
    this.router.navigate(['/help']).then(() => {
      });
  }


  download(selectedClientOrder: ClientOrderVM)
  {
    this.ventrixdbservice.createDeliveredOrderPDF(selectedClientOrder)
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
     saveAs(data, selectedClientOrder.description.toString()+" Delivered Order Report");
   });
  }

  searchClientOrder()
  { 
    this.clientOrderVM = [];
    this.completed = [];
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
            this.router.navigate(['/completed-orders']).then(() => {
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
              
                    if (this.temp.description == 'Delivered')
                    {
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
                      this.clientOrderVM.push(this.order)
                    }
                })
                 }
               });
    
              });
            });

            if (this.clientOrderVM.length == 0)
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
              this.router.navigate(['/completed-orders']).then(() => {
                window.location.reload();
              });
            }
          })  
          }
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
              this.router.navigate(['/completed-orders']).then(() => {
                window.location.reload();
              });
            }
          })  
          }
        })
      }  
  }
}
