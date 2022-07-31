import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { DeliveriesService } from '../pages/_services/deliveries.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { CollectedOrder } from 'src/app/shared/CollectedOrder';
import { Account } from 'src/app/shared/Account';
import { VentrixDBServiceService } from 'src/app/auth/services/ventrix-db-service.service';
import { PathService } from '../auth/services/path-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-searchorder',
  templateUrl: './searchorder.page.html',
  styleUrls: ['./searchorder.page.scss'],
})
export class SearchorderPage implements OnInit {
  isHelp: boolean;
  order!:any;
  temp!:ClientOrderStatus;
  clientOrdersStatuses:ClientOrderStatus[] = [];
  collectedOrders:CollectedOrder[] = [];
  account:Account;
  deliveries = new Array<any>();
  myForm: FormGroup;
  query:string;
  constructor(
    private ventrixdbservice:VentrixDBServiceService,
    private deliveryService: DeliveriesService,
    public toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private pathservice: PathService,
    fbuilder: FormBuilder
  ) {
    this.myForm = fbuilder.group({
      query: new FormControl('', [ Validators.required])
  });}

  ngOnInit() {
    this.getCDeliveries();
    this.pathservice.clearPath();
    this.pathservice.setPath('/searchorder');
  }

  //get collections from the database
  getCDeliveries() {
    this.account = this.ventrixdbservice.getAccount();
    console.log(this.account)
    this.deliveryService.getOrdersToBeDelivered().subscribe((data: any) => {
     
      this.deliveryService.readCollectedorders()
      .subscribe(response => {
        this.collectedOrders = response;
        console.log()
      data.forEach(clientorder => {
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
            //Displays orders collected by that specific driver and only shows orders not completed
            if(element.employeeId == this.account.employeeId && clientorder.clientOrderId == element.clientOrderId)
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
                status: this.temp.description
              }
              this.deliveries.push(this.order);
            }
          });
       })
      });
    })
      console.log(this.deliveries)
      });
  }

  help() {
    this.isHelp = !this.isHelp;
  }

  //Search
  onSubmit() 
  {
    this.deliveries = [];
    this.query = this.myForm.get('query').value;
    this.account = this.ventrixdbservice.getAccount();
    console.log(this.account)
    this.deliveryService.searchClientOrder(this.query).subscribe((data: any) => {
     console.log(data)
      this.deliveryService.readCollectedorders()
      .subscribe(response => {
        this.collectedOrders = response;
        console.log()
      data.forEach(clientorder => {
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
            //Displays orders collected by that specific driver and only shows orders not completed
            if(element.employeeId == this.account.employeeId && clientorder.clientOrderId == element.clientOrderId)
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
                status: this.temp.description
              }
              this.deliveries.push(this.order);
            }
          });
       })
      });
    })
      console.log(this.deliveries)
      });
  }

  async changeStatus(order: ClientOrderVM) {
    console.log(Number(order.clientOrderId))
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
