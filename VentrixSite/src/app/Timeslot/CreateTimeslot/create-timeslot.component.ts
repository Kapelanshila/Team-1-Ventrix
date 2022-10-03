import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { AssetVM } from 'src/app/shared/AssetVM';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DeliveryTimeslot } from 'src/app/shared/DeliveryTimeslot';
import { TimeslotVM } from 'src/app/shared/TimeslotVM';
import { TimeslotResponse } from 'src/app/shared/TimeSlotResponse';

@Component({
  selector: 'app-create-timeslot',
  templateUrl: './create-timeslot.component.html',
  styleUrls: ['./create-timeslot.component.css']
})
export class CreateTimeslotComponent implements OnInit {
  types:any[] = [];
  categories:any[] = [];
  timeslotform : FormGroup;
  submitted = false;
  assetitem:AssetVM | undefined;
  find = false;
  currentDate!:any;
  disabled = false;
  clicked = false;
  deliveryTimeSlots:DeliveryTimeslot[] =[];
  timeslots:any[] = [];
  timeslotdates:any[] = [];
  item!: TimeslotVM;
  response!: TimeslotResponse;
  timeslotVM:TimeslotVM[] = [];
  date!: string;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService, private http: HttpClient)
  {
      //Additional Validation can be added here
      this.timeslotform = fbuilder.group({
      deliveryTimeslotId: new FormControl (0),
      timeslotId: new FormControl (0),
      dateId: new FormControl (0),
      startTime: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      endTime: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      slotDate: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

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
       })
     })
   })
  }
  
  get f() {return this.timeslotform.controls!; }

  returnDataTable()
  {
    this.router.navigate(['/read-timeslot']);
  }

  addTimeslot()
    {
    this.submitted = true;
    this.find = false;


    //Check if asset item does not already exsist
    if (this.timeslotVM.length != 0)
    {
      this.timeslotVM.forEach(element => {
        if (
          ( new Date (element.slotDate).getFullYear() == new Date(this.timeslotform.get('slotDate')?.value).getFullYear()) 
          && new Date (element.slotDate).getMonth() == new Date(this.timeslotform.get('slotDate')?.value).getMonth()
          && new Date (element.slotDate).getDate() == new Date(this.timeslotform.get('slotDate')?.value).getDate()
          && this.find == false)
          {
            this.find = true;
            Swal.fire({
              icon: 'warning',
              title: 'Duplicate Date',
              confirmButtonText: 'OK',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }) 
          }
    });
    }


    if ((this.timeslotform.get('startTime')?.value > this.timeslotform.get('endTime')?.value) || (this.timeslotform.get('startTime')?.value == this.timeslotform.get('endTime')?.value))
    {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Time',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }) 
    }

    if (this.timeslotform.valid && this.find == false && (this.timeslotform.get('startTime')?.value < this.timeslotform.get('endTime')?.value) && (this.timeslotform.get('startTime')?.value != this.timeslotform.get('endTime')?.value)) 
      { 
        this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        if (Date.parse(this.currentDate) > Date.parse(this.timeslotform.get('slotDate')?.value))
        {
          Swal.fire({
            icon: 'warning',
            title: 'Invalid Date',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else
        {
          this.response =
          {
            deliveryTimeslotId: this.timeslotform.get('deliveryTimeslotId')?.value,
            timeslotId: this.timeslotform.get('timeslotId')?.value,
            dateId: this.timeslotform.get('dateId')?.value,
            startTime: this.timeslotform.get('slotDate')?.value+' '+this.timeslotform.get('startTime')?.value,
            endTime:  this.timeslotform.get('slotDate')?.value+' '+this.timeslotform.get('endTime')?.value,
            slotDate: this.timeslotform.get('slotDate')?.value,
          }

          this.ventrixdbservice.createTimeslot(this.response).subscribe();
          Swal.fire({
            icon: 'success',
            title: 'Time slot created successfully',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/read-timeslot']).then(() => {
                window.location.reload();
              });
            }
          })  
          }
    }
  }

    //Check no white spaces
    public noWhitespaceValidator(someFormControl: FormControl) 
    {
      var iCount = 0;
      for(var i = 0; i < someFormControl.value.length; i++)
      {
        if (someFormControl.value[i] == " ")
        {
          iCount += 1
        }
      }
      if (iCount != someFormControl.value.length)
      {
        return  null
      }
      return {'noWhitespaceValidator' : true}
    }
}
