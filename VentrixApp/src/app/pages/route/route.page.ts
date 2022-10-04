import { Component, OnInit } from '@angular/core';
import { AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { VentrixDBServiceService } from 'src/app/auth/services/ventrix-db-service.service';
import { Account } from 'src/app/shared/Account';
import { CollectedOrder } from 'src/app/shared/CollectedOrder';
import { Google } from 'src/app/shared/Google';
import { RouteVM } from 'src/app/shared/RouteVM';
import { DeliveriesService } from '../_services/deliveries.service';


@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage implements OnInit {
  
    public items = [];
    account:Account;
    routes:RouteVM[] = [];
    query:RouteVM[] = [];
    routesdisplay:RouteVM[] = [];
    collectedOrders:CollectedOrder[] = [];
    message:string;
    destinations:string;
    returned:any;
    totalreturned:any;
    VM:Google[] =[];
    item:Google;
    distance:string;
    duration:string;
    totaldistance:string;
    totalduration:string;
    constructor(private deliveryService: DeliveriesService, private ventrixdbservice:VentrixDBServiceService, private alertController: AlertController) 
    { 

    }

  ngOnInit() {
    this.getAllEnrouteOrders();
    this.getTotalDistance();
    this.account = this.ventrixdbservice.getAccount();
  }

	doReorder(ev: CustomEvent<ItemReorderEventDetail>) {

    this.VM = ev.detail.complete(
      this.VM
    );
  }

  //Get all client addresses and call the google maps distance matrix api form the c# api 
  getAllEnrouteOrders() {
    this.deliveryService.getEnRouteOrders().subscribe(response => {
      this.routes =  response;
      this.routesdisplay = this.routes.filter((v,i,a)=>a.findIndex(v2=>(v2.clientId===v.clientId))===i)
    
      this.routesdisplay.forEach(element => {
        this.deliveryService.GoogleMaps(element.address).subscribe(response => {
          this.returned = response

          this.distance = this.returned.rows[0].elements[0].distance.text;
          this.duration = this.returned.rows[0].elements[0].duration.text;
          this.item =
          {
            clientId: element.clientId,
            clientName:element.clientName,
            description:element.description,
            address:element.address,
            distance: Number(this.distance.replace('km','')),
            duration: this.duration
          }
          this.VM.push(this.item)
        });
      });
    });
  }


  getTotalDistance() {
    this.deliveryService.getEnRouteOrders().subscribe(response => {
      this.routes =  response;
      this.routesdisplay = this.routes.filter((v,i,a)=>a.findIndex(v2=>(v2.clientId===v.clientId))===i)

      this.destinations = '';
      for (let index = 0; index < this.routesdisplay.length; index++) {
        const element = this.routesdisplay[index];
        if (index != this.routesdisplay.length - 1)
        {
          this.destinations = this.destinations+element.address+', '
        }
        else
        {
          this.destinations = this.destinations+element.address
        }
      }
        
      //Returns Total Adresses distance and durations
        this.deliveryService.GoogleMaps(this.destinations).subscribe(response => {
          this.totalreturned = response;
          this.totaldistance = this.totalreturned.rows[0].elements[0].distance.text;
          this.totalduration = this.totalreturned.rows[0].elements[0].duration.text;
        });

    });
  }

  async details(clientId: number) {
    this.message = 'Order(s): <br>';
    this.routes.forEach(element => {
      if (element.clientId == clientId)
      {
        this.message = this.message+element.description+"<br>"
      }
    });
    this.message = this.message+"<br>Address:<br>"+this.routesdisplay.find(x => x.clientId == clientId).address;
    this.message = this.message+"<br><br>Travel Time:<br>"+this.VM.find(x => x.clientId == clientId).duration;
    const alert = await this.alertController.create({
      header: 'Details',
      cssClass: 'secondary',
      message: this.message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {' this.handlerMessage'; }
        }
      ]
    });
    
    await alert.present();
  }

  refresh()
  {
    window.location.reload();
  }
}
