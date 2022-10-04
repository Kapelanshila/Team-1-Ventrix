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
import { ClientOrder } from 'src/app/shared/ClientOrder';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { InventoryPopup } from 'src/app/shared/InventoryPopUp';
import { AssignedAsset } from 'src/app/shared/AssignedAsset';
import { DeliveryTimeslot } from 'src/app/shared/DeliveryTimeslot';
import { TimeslotVM } from 'src/app/shared/TimeslotVM';


@Component({
  selector: 'app-read-timeslot',
  templateUrl: './read-timeslot.component.html',
  styleUrls: ['./read-timeslot.component.css']
})
export class ReadTimeslotComponent implements OnInit {
  p: number = 1;
  config: any; 
  noOfRows = 10;

  orderdeliveries!:any;
  deliveryTimeSlots:DeliveryTimeslot[] =[];
  timeslots:any[] = [];
  timeslotdates:any[] = [];
  item!: TimeslotVM;
  timeslotVM:TimeslotVM[] = [];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { }
  
  ngOnInit(): void
  {
    this.ventrixdbservice.readDeliveryTimeslots()
    .subscribe(response => {
      this.deliveryTimeSlots = response;

      this.ventrixdbservice.readTimeslots()
      .subscribe(response => {
        this.timeslots = response;

        
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
          console.log(this.timeslotVM)
       })
     })
   })
  }

  addTimeslot()
  {
    this.router.navigate(['/create-timeslot']);
  }

  
  help()
  {
    this.ventrixdbservice.setPage(67);
    this.router.navigate(['/help']).then(() => {
      });
  }

  editTimeslot(selectedTimeslot: TimeslotVM)
  {
      this.ventrixdbservice.setTimeslot(selectedTimeslot);
      this.router.navigate(['/update-timeslot']);
  }

  customView()
  {
      this.router.navigate(['/timeslot']);
  }

  deleteTimeslot(selectedTimeslot: TimeslotVM)
  {
    this.ventrixdbservice.readOrderDeliveries()
    .subscribe(response => {
      this.orderdeliveries = response;

      if ((this.orderdeliveries.find((x: { timeslotId: Number; }) => x.timeslotId == selectedTimeslot.timeslotId) == undefined) && (this.orderdeliveries.find((x: { dateId: Number; }) => x.dateId == selectedTimeslot.dateId) == undefined))
      {
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure you want to delete this timeslot?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.deleteTimeslot(selectedTimeslot).subscribe();
            this.router.navigate(['/read-timeslot']).then(() => {
            window.location.reload();
            });
          }
        })  
        }
        else
        {
          Swal.fire({
            icon: 'warning',
            title: 'Timeslot associated to deliveries',
            showDenyButton: false,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
      })
  }
}
