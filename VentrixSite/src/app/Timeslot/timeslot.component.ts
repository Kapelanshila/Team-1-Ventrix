import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, elementAt, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { setMinutes, setHours } from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import { DeliveryTimeslot } from '../shared/DeliveryTimeslot';
import { TimeslotVM } from '../shared/TimeslotVM';
import { colors } from '../shared/colors';
import { TimeslotResponse } from '../shared/TimeSlotResponse';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {
  view: CalendarView = CalendarView.Week;
  response!: TimeslotResponse;
  currentDate!:any;
  viewDate = new Date();
  deliveryTimeSlots:DeliveryTimeslot[] =[];
  timeslots:any[] = [];
  timeslotdates:any[] = [];
  item!: TimeslotVM;
  timeslotVM:TimeslotVM[] = [];
  value!:CalendarEvent;
  events: CalendarEvent[] = [];
  starthours!:string;
  startminutes!:string;
  endhours!:string;
  endminutes!:string;
  find = false;
  refresh = new Subject<void>();
  invalid = false;
  tempstart!:any;
  tempend!:any;
  orderdeliveries!: any;
  date!:string;
  eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
    //In the event the user changes the timeslot 
    event.start = newStart;
    event.end = newEnd;

    this.response =
    {
      deliveryTimeslotId: event.id,
      timeslotId: this.timeslotVM.find(x => x.deliveryTimeslotId == event.id)?.timeslotId,
      dateId: this.timeslotVM.find(x => x.deliveryTimeslotId == event.id)?.dateId,
      startTime: newStart.toDateString()+' '+event.start.toTimeString().substring(0,5),
      endTime:  newEnd?.toDateString()+' '+event.end?.toTimeString().substring(0,5),
      slotDate: event.end,
    }

    this.timeslotVM.forEach(element => {
      //Check if the time slot is not on the same date
      if (
        (
        new Date (element.slotDate).getFullYear() == new Date(this.response.endTime!).getFullYear()
        && new Date (element.slotDate).getMonth() == new Date(this.response.endTime!).getMonth()
        && new Date (element.slotDate).getDate() == new Date(this.response.endTime!).getDate()
        )
        && element.deliveryTimeslotId != this.response.deliveryTimeslotId
        && this.find == false)
        {
          this.find = true;
        }
    });

    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    if (Date.parse(this.currentDate) > Date.parse(event.start.toDateString()) && event.start.getDay() != new Date(this.currentDate).getDay())
    {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Date',
        text: 'Previous dates cannot be selected',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/timeslot']).then(() => {
            window.location.reload();
          });
        }
      })  
    }
    else{
  if (
    (
    new Date (this.response.startTime!).getFullYear() != new Date(this.response.endTime!).getFullYear()
    || new Date (this.response.startTime!).getMonth() != new Date(this.response.endTime!).getMonth()
    || new Date (this.response.startTime!).getDate() != new Date(this.response.endTime!).getDate()
    )
    && this.invalid == false)
    {
      this.invalid = true;
    }     

    if (this.find == true)
    {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Date',
        text: 'Time slots cannot be on the same date',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/timeslot']).then(() => {
            window.location.reload();
          });
        }
      })  
    }

    if (this.invalid == true)
    {
      Swal.fire({
        icon: 'warning',
        title: 'Timeslot Invalid',
        text: 'Timeslot cannot span two days',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/timeslot']).then(() => {
            window.location.reload();
          });
        }
      })  
    }
    if (this.find == false && this.invalid == false)
    {
      event.start = newStart;
      event.end = newEnd;
      Swal.fire({
        icon: 'info',
        title: 'Are you sure you want to update this timeslot?',
        html:
          '<p>Date: '+event.start.toDateString()+'</p>'
          +'<p> Start Time: '+event.start.toTimeString().substring(0,5)+'</p>'
          +'<p> End Time: '+event.end?.toTimeString().substring(0,5)+'</p>',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.updateTimeslot(this.response).subscribe();
            Swal.fire({
              icon: 'success',
              title: 'Time slot updated successfully',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/timeslot']).then(() => {
                  window.location.reload();
                });
              }
            })  
          }
          else
          {
            this.router.navigate(['/timeslot']).then(() => {
            window.location.reload();
            });
          }
        })  
    }
    this.refresh.next();
  }
  }

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readDeliveryTimeslots()
    .subscribe(response => {
      this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.deliveryTimeSlots = response;

      this.ventrixdbservice.readTimeslots()
      .subscribe(response => {
        this.timeslots = response;

     
        this.ventrixdbservice.readOrderDeliveries()
        .subscribe(response => {
          this.orderdeliveries = response;
  
        
      this.ventrixdbservice.readTimeslotDates()
      .subscribe(response => {
        this.timeslotdates = response;
        
          this.deliveryTimeSlots.forEach(element => {

            this.item = 
            {
              deliveryTimeslotId: element.deliveryTimeslotId,
              timeslotId: element.timeslotId,
              dateId: element.dateId,
              startTime: this.timeslots.find(x => x.timeslotId == element.timeslotId).startTime,
              endTime: this.timeslots.find(x => x.timeslotId == element.timeslotId).endTime,
              slotDate: this.timeslotdates.find(x => x.dateId == element.dateId).slotDate
            }

            this.timeslotVM.push(this.item);
          });
          
          //Timeslots that are not being used but are for a previous date are purple
          this.timeslotVM.forEach(element => {
            this.date =  formatDate(new Date(element.slotDate), 'yyyy-MM-dd', 'en');

            if ((this.orderdeliveries.find((x: { timeslotId: Number; }) => x.timeslotId == element.timeslotId) == undefined) && (this.orderdeliveries.find((x: { dateId: Number; }) => x.dateId == element.dateId) == undefined))
            {
              if (Date.parse(this.currentDate) > Date.parse(this.date) && Date.parse(this.currentDate) != Date.parse(this.date))
              {
                this.events = [
                  ...this.events,
                  {
    
                    title: "Delivery Timeslot",
                    id: element.deliveryTimeslotId,
                    start: setHours(setMinutes(new Date(element.slotDate), new Date(element.startTime).getMinutes()), new Date(element.startTime).getHours()),
                    end: setHours(setMinutes(new Date(element.slotDate), new Date(element.endTime).getMinutes()), new Date(element.endTime).getHours()),
                    color: colors.purple,
                    draggable: false,
                    resizable: {
                      beforeStart: false,
                      afterEnd: false,
                    },
                  },
                ];
              }
              else
              {
                this.events = [
                  ...this.events,
                  {
    
                    title: "Delivery Timeslot",
                    id: element.deliveryTimeslotId,
                    start: setHours(setMinutes(new Date(element.slotDate), new Date(element.startTime).getMinutes()), new Date(element.startTime).getHours()),
                    end: setHours(setMinutes(new Date(element.slotDate), new Date(element.endTime).getMinutes()), new Date(element.endTime).getHours()),
                    color: colors.blue,
                    draggable: true,
                    resizable: {
                      beforeStart: true,
                      afterEnd: true,
                    },
                  },
                ];
              }
            }
            else
            {
              //Timeslots being used cannot be edited
              this.events = [
                ...this.events,
                {
  
                  title: "Delivery Timeslot",
                  id: element.deliveryTimeslotId,
                  start: setHours(setMinutes(new Date(element.slotDate), new Date(element.startTime).getMinutes()), new Date(element.startTime).getHours()),
                  end: setHours(setMinutes(new Date(element.slotDate), new Date(element.endTime).getMinutes()), new Date(element.endTime).getHours()),
                  color: colors.red,
                  draggable: false,
                  resizable: {
                    beforeStart: false,
                    afterEnd: false,
                  },
                },
              ];
          }
          });
       })
     })
    })
   })
  }

  help()
  {
    this.ventrixdbservice.setPage(69);
    this.router.navigate(['/help']).then(() => {
      });
  }

}
