import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveriesService } from '../_services/deliveries.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {



  isHelp: boolean;
  isRescheduled: boolean;

  public timesSlots = new Array<any>();
  public clientInfo: any;
  public previousDeliveryInfo: any;
  public rescheduledInfo: any;
  id: number;
  clientId: number;


  constructor(
    private deliveryService: DeliveriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.clientId = Number(this.activatedRoute.snapshot.params.clientId);
    this.getDeliveryTimeSlots();
  }

  getDeliveryTimeSlots() {
    this.deliveryService
      .getDeliveryTimeSlots(this.clientId)
      .subscribe((data: any) => {
        this.isRescheduled =  data.previoudDelivery.rescheduled;
        this.rescheduledInfo = {
          date: data.previoudDelivery.clientOrder.deliveryReschedules[0].date.slotDate,
          timeslot: data.previoudDelivery.clientOrder.deliveryReschedules[0].timeslot.slotTime
        };


        this.timesSlots = data.slots;
        this.clientInfo = data.UserInfo;
       this.previousDeliveryInfo = {
        oderDeliveryId: data.previoudDelivery.orderDeliveryId,
        date: data.previoudDelivery.date.slotDate,
        time: data.previoudDelivery.timeslot.slotTime
       };

      });
  }


}
