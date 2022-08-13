import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ScheduleVM } from 'src/app/shared/Schedule';
import { VentrixDBServiceService } from '../auth/services/ventrix-db-service.service';
import { DeliveriesService } from '../pages/_services/deliveries.service';
import { InventoryPopup } from '../shared/InventoryPopUp';
import { ExtensionPipe } from '../pipes/extension.pipe';
import { OrderDelivery } from '../shared/OrderDelivery';
import { PathService } from '../auth/services/path-service.service';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.page.html',
  styleUrls: ['./vieworder.page.scss'],
})
export class VieworderPage implements OnInit {
  clientOrderId: number;
  isHelp: boolean;
  public timesSlots = new Array<any>();
  public clientInfo: any;
  clientId: number;
  orders: any[] = [];
  vieworder: any[] = [];
  orderdelivery: OrderDelivery;
  selectedorder: any;
  currentDate!:any;
  slotdate!:any;
  foundorder!:any;
  orderdate:Date;
  startTime:Date;
  endTime:Date;
  id: number;
  path:string;
  myForm: FormGroup =new FormGroup({
    slotID: new FormControl('', Validators.required)
 });
 item!: InventoryPopup;
 inventories: any[] =[];
 clientorderlines: any[] = [];
  
  constructor(
    private deliveryService: DeliveriesService,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ventrixdbservice:VentrixDBServiceService,
    private pathservice: PathService
  ) { }

  ngOnInit() {
    this.path = this.pathservice.getPath();
    this.id = Number(this.activatedRoute.snapshot.params.clientOrderId);
    this.getDeliveryTimeSlots();

    this.ventrixdbservice.readClientOrderLine()
    .subscribe(response => {
      this.clientorderlines = response;
      console.log(this.clientorderlines)
      this.ventrixdbservice.readInventory()
      .subscribe(response => {
        this.inventories = response;
   
        this.clientorderlines.forEach(element => {
          if (element.clientOrderId == this.id)
          {
            this.item =
            {
              name: this.inventories.find(x => x.inventoryId == element.inventoryId).name,
              date: element.date,
              quantity: element.quantity
            }
            this.vieworder.push(this.item);
          }
        });
      })
    })
  }

  getDeliveryTimeSlots() {
    this.deliveryService.readOrderDeliveries()
    .subscribe(response => {
      this.orders = response;
      this.orderdelivery = this.orders.find(x => x.clientOrderId == this.id);

    //Returns the timeslots that date the current date or future dates
    this.deliveryService
      .getDeliveryTimeSlots(this.id)
      .subscribe((data: any) => {

        this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        data.slots.forEach(element => {
          if (this.orderdelivery.dateId != element.dateId)
          {
            this.slotdate = formatDate(new Date(element.date.slotDate), 'yyyy-MM-dd', 'en');
            if (Date.parse(this.currentDate) <= Date.parse(this.slotdate))
            {
              this.timesSlots.push(element);
            }
          }
          else
          {
            this.foundorder = element;
            this.orderdate= this.foundorder.date.slotDate;
            this.startTime = this.foundorder.timeslot.startTime;
            this.endTime = this.foundorder.timeslot.endTime;

          }
        });
        
        this.clientInfo = data.UserInfo;
      });
    })
  }


}
