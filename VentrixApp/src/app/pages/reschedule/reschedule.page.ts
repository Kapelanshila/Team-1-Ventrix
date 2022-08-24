/* eslint-disable @typescript-eslint/naming-convention */
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { VentrixDBServiceService } from 'src/app/auth/services/ventrix-db-service.service';
import { OrderDelivery } from 'src/app/shared/OrderDelivery';
import { ReScheduleVM, ScheduleVM } from 'src/app/shared/Schedule';
import { DeliveriesService } from '../_services/deliveries.service';
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.page.html',
  styleUrls: ['./reschedule.page.scss'],
})
export class ReschedulePage implements OnInit {


  isHelp: boolean;
  public timesSlots = new Array<any>();
  public clientInfo: any;
  public previousDeliveryInfo: any;
  id: number;
  clientId: number;
  orders: any[] = [];
  orderdelivery: OrderDelivery;
  selectedorder: any;
  currentDate!:any;
  slotdate!:any;
  foundorder!:any;
  orderdate:Date;
  startTime:Date;
  endTime:Date;
  myForm: FormGroup =new FormGroup({
  slotID: new FormControl('', Validators.required),
  Reason: new FormControl('', Validators.required)
});

  constructor(
    private deliveryService: DeliveriesService,
    public toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params.orderId);

    this.clientId = Number(this.activatedRoute.snapshot.params.clientId);
    this.getDeliveryTimeSlots();
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
              console.log(this.timesSlots)
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

   //schedule order
   onSubmit() {
    const reschedule: ReScheduleVM = {
      deliveryId :   this.id,
      dateTimeSlotId: this.myForm.value.slotID.timeslotId,
      ReasonDescription: this.myForm.value.Reason

    };
    this.deliveryService.rescheduleDelivery(reschedule).subscribe(
      (data: any) => {
        this.successfulSchedule(true);
        this.router.navigate(['/deliveries']).then(() => {
          window.location.reload();
        });
      },
      (error: any) => {
        this.successfulSchedule(false);
      }
    );
  }

  async successfulSchedule(isSuccess) {
    let toast;
    if (isSuccess) {
      toast = await this.toastController.create({
        message: 'Delivery Successfully Rescheduled.',
        color: 'success',
        duration: 2000,
      });
    } else {
      toast = await this.toastController.create({
        message: 'Delivery not Rescheduled..',
        color: 'danger',
        duration: 2000,
      });
    }

    toast.present();
  }
}
