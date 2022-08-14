import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { DeliveriesService } from '../_services/deliveries.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { CollectedOrder } from 'src/app/shared/CollectedOrder';
import { Account } from 'src/app/shared/Account';
import { VentrixDBServiceService } from 'src/app/auth/services/ventrix-db-service.service';
import { PathService } from 'src/app/auth/services/path-service.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
})
export class DeliveriesPage implements OnInit {
  isHelp: boolean;
  order!:any;
  temp!:ClientOrderStatus;
  clientOrdersStatuses:ClientOrderStatus[] = [];
  collectedOrders:CollectedOrder[] = [];
  account:Account;
  deliveries = new Array<any>();
  orderdeliveries:any[] = [];
  odelivery:any;
  constructor(
    private ventrixdbservice:VentrixDBServiceService,
    private deliveryService: DeliveriesService,
    public toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private pathservice: PathService
  ) {}

  ngOnInit() {
    this.pathservice.clearPath();
    this.pathservice.setPath('/deliveries');
    this.getCDeliveries();
  }

  //get collections from the database
  getCDeliveries() {
    this.account = this.ventrixdbservice.getAccount();
    this.deliveryService.getOrdersToBeDelivered().subscribe((data: any) => {
     
      this.deliveryService.readCollectedorders()
      .subscribe(response => {
        this.collectedOrders = response;

      data.forEach(clientorder => {


        this.deliveryService.readOrderDeliveries()
        .subscribe(response => {
          this.orderdeliveries = response;

          this.deliveryService.readClientOrderStatuses()
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
          
          this.collectedOrders.forEach(element => {
            this.odelivery = this.orderdeliveries.find(x=> x.clientOrderId == element.clientOrderId);
            if(this.odelivery !=undefined)
            {
            //Displays orders collected by that specific driver and only shows orders not completed
            if(element.employeeId == this.account.employeeId && clientorder.clientOrderId == element.clientOrderId && this.temp.description != "Delivered")
            {
              this.order = 
              {
                clientOrderId: clientorder.clientOrderId,
                clientId: clientorder.clientId,
                description :clientorder.description,
                clientInvoice: clientorder.clientInvoice,
                contactPersonName : '',
                contactPersonSurname: '',
                emailAddress: '',
                status: this.temp.description,
                rescheduled: this.odelivery.rescheduled
              }
              this.deliveries.push(this.order);
              console.log(this.deliveries)
            }
            }
            else
            {
                          //Displays orders collected by that specific driver and only shows orders not completed
            if(element.employeeId == this.account.employeeId && clientorder.clientOrderId == element.clientOrderId && this.temp.description != "Delivered")
            {
              this.order = 
              {
                clientOrderId: clientorder.clientOrderId,
                clientId: clientorder.clientId,
                description :clientorder.description,
                clientInvoice: clientorder.clientInvoice,
                contactPersonName : '',
                contactPersonSurname: '',
                emailAddress: '',
                status: this.temp.description,
                rescheduled: null
              }
              this.deliveries.push(this.order);
              console.log(this.deliveries)
            }
            }

          });
       })
      })
      });
    })
      console.log(this.deliveries)
      });
  }
  help() {
    this.isHelp = !this.isHelp;
  }
  
  async changeStatus(order: ClientOrderVM) {
    const alert = await this.alertController.create({
      header: 'Change Status to En-route?',
      cssClass: 'secondary',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {' this.handlerMessage'; }
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {

            this.deliveryService.changeDeliveryStatusEnroute(Number(order.clientOrderId)).subscribe(data => {
              window.location.reload();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  refresh()
  {
    window.location.reload();
  }


  public navigateToDetails(id: number)
  {
    this.router.navigate(['/details', id]);
  }
  async successfulOrderCollection(isSuccess) {
    let toast;
    if (isSuccess) {
      toast = await this.toastController.create({
        message: 'Order Status Updated.',
        color: 'success',
        duration: 2000,
      });
    } else {
      toast = await this.toastController.create({
        message: 'Error in collection.',
        color: 'danger',
        duration: 2000,
      });
    }

    toast.present();
  }
}
