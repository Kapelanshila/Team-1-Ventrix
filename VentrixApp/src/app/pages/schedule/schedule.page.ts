import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ScheduleVM } from 'src/app/shared/Schedule';
import { DeliveriesService } from '../_services/deliveries.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  isHelp: boolean;
  public timesSlots = new Array<any>();
  public clientInfo: any;
  id: number;
  clientId: number;
  currentDate!:any;

  slotdate!:any;
  myForm: FormGroup =new FormGroup({
       slotID: new FormControl('', Validators.required)
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
    //Returns the timeslots that date the current date or future dates
    this.deliveryService
      .getDeliveryTimeSlots(this.id)
      .subscribe((data: any) => {

        this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    
        data.slots.forEach(element => {

          this.slotdate = formatDate(new Date(element.date.slotDate), 'yyyy-MM-dd', 'en');
          if (Date.parse(this.currentDate) <= Date.parse(this.slotdate))
          {
            this.timesSlots.push(element);
          }
        });
        this.clientInfo = data.UserInfo;
      });
  }

   //schedule order
   onSubmit() {
    const schedule: ScheduleVM = {
      orderId :   this.id,
      dateTimeSlotId: this.myForm.value.slotID.timeslotId
    };
    this.deliveryService.scheduleDelivery(schedule).subscribe(
      (data: any) => {
        this.successfulSchedule(true);
        this.deliveryService.ScheduleSMS(schedule).subscribe();
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
        message: 'Delivery Successfully Scheduled.',
        color: 'success',
        duration: 2000,
      });
    } else {
      toast = await this.toastController.create({
        message: 'Delivery not Scheduled..',
        color: 'danger',
        duration: 2000,
      });
    }

    toast.present();
  }
}
