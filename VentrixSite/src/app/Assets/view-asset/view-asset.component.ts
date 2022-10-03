import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import {PrimeIcons} from 'primeng/api';
import { AssetHistoryLocation } from 'src/app/shared/AssetHistoryLocation';
import * as moment from 'moment';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.css']
})
export class ViewAssetComponent implements OnInit {
  
  assetitem:AssetVM | undefined;
  events: any[] = [];
  item!:AssetHistoryLocation;
  assetlocations:any[] = [];
  employees:any[] = [];
  warehouses:any[] = [];
  assets:any[] = [];
  locations:any[] = [];
  value!:any;

  //Condition Meter
  public canvasWidth!: number
  public needleValue!: number
  public centralLabel!: string
  public options!: any;
  public bottomLabel = '';
  public name = 'Condition';
  public  nameFont = '25';
  image!: any;
  thumbnail: any;
  @ViewChild('rootSVG') rootSVG!: ElementRef;

  percent!:any;
  daysleft!: number;
  intialdays!: number;
  
  constructor(private ventrixdbservice:VentrixDBServiceService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void 
  {
    //Meter Configuration
    this.assetitem = this.ventrixdbservice.getAsset();
    this.canvasWidth = 350
    this.needleValue = 65
    this.centralLabel = this.assetitem!.condition!;
    //Gauge Display Condition of Asset 
    switch(this.assetitem!.condition!) { 
      case 'Good': { 
          this.options = {
            hasNeedle: false,
            needleUpdateSpeed: 1000,
            arcColors: ['rgb(0, 230, 77)', 'lightgray'],
            arcDelimiters: [90],
            needleStartValue: 50,
          }
          break; 
      } 
      case 'Bad': { 
        this.options = {
          hasNeedle: false,
          needleUpdateSpeed: 1000,
          arcColors: ['rgb(255, 51, 0)', 'lightgray'],
          arcDelimiters: [30],
          needleStartValue: 50,
          }
          break; 
      } 
      case 'Poor':  { 
        this.options = {
          hasNeedle: false,
          needleUpdateSpeed: 1000,
          arcColors: ['rgb(255, 255, 51)', 'lightgray'],
          arcDelimiters: [60],
          needleStartValue: 50,
          }
          break; 
      } 
    }  

    this.ventrixdbservice.getAssetImage(this.assetitem?.assetImage!)
    .subscribe(response => {
      this.image= 'data:image/jpeg;base64,' + response;
    })



    //Adds Speciefied Years to Warranty
    const warrantyEndDate = new Date();
    const warrantyCurrentDate = new Date();
    const warrantyStartDate = new Date(this.assetitem!.warrantyDate!);
    warrantyEndDate.setFullYear(warrantyStartDate.getFullYear() + this.assetitem?.warrantyperiod!);


    //Calculate days between start of warranty and end of warranty 
    this.intialdays = Math.floor((Date.UTC(warrantyEndDate.getFullYear(), warrantyEndDate.getMonth(), warrantyEndDate.getDate()) - Date.UTC(warrantyStartDate.getFullYear(), warrantyStartDate.getMonth(), warrantyStartDate.getDate()) ) /(1000 * 60 * 60 * 24));

    //To get progress we first calculate the warranty end date based on when the warranty started then we calculate the days left by comparing the current date and the warranty end date 
    this.daysleft = Math.floor((Date.UTC(warrantyEndDate.getFullYear(), warrantyEndDate.getMonth(), warrantyEndDate.getDate()) - Date.UTC(warrantyCurrentDate.getFullYear(), warrantyCurrentDate.getMonth(), warrantyCurrentDate.getDate()) ) /(1000 * 60 * 60 * 24));
    this.percent = Math.round(this.daysleft/this.intialdays*100).toFixed(2);;

    //This now tells us the total days of the warranty we had intially and the amount of days we have left 
    //It is then represented as a percentage


    //Asset History Location 
    this.ventrixdbservice.readAssetLocations(this.assetitem)
    .subscribe(response => {
      this.assetlocations = response;

      this.ventrixdbservice.readEmployee()
      .subscribe(response => {
        this.employees = response;

        this.ventrixdbservice.readAsset()
        .subscribe(response => {
          this.assets = response;

          this.ventrixdbservice.readWarehouse()
          .subscribe(response => {
            this.warehouses = response;

       
          this.assetlocations.forEach(element => {
          if (element.warehouseId != null && element.employeeId != null)
          {
            this.item = 
            {
              assetHistoryLocationId: element.assetHistoryLocationId,
              assetId: element.assetId,
              employeeId: element.employeeId,
              assetname: this.assets.find(x => x.assetId == element.assetId).name,
              employeename: this.employees.find(x => x.employeeId == element.employeeId).name,
              employeesurname: this.employees.find(x => x.employeeId == element.employeeId).surname,
              date: element.date,
              warehouseId: element.warehouseId,
              warehouseaddress: this.warehouses.find(x => x.warehouseId == element.warehouseId).address,
              employeeaddress: this.employees.find(x => x.employeeId == element.employeeId).homeAddress,
              warehousename: this.warehouses.find(x => x.warehouseId == element.warehouseId).name
            }
            this.locations.push(this.item);
          }

          if (element.warehouseId != null && element.employeeId == null)
          {
            this.item = 
            {
              assetHistoryLocationId: element.assetHistoryLocationId,
              assetId: element.assetId,
              employeeId: null,
              assetname: this.assets.find(x => x.assetId == element.assetId).name,
              employeename: '',
              employeesurname: '',
              date: element.date,
              warehouseId: element.warehouseId,
              warehouseaddress: this.warehouses.find(x => x.warehouseId == element.warehouseId).address,
              employeeaddress: '',
              warehousename: this.warehouses.find(x => x.warehouseId == element.warehouseId).name

            }
            this.locations.push(this.item);
          }

          if (element.warehouseId == null && element.employeeId != null)
          {
            this.item = 
            {
              assetHistoryLocationId: element.assetHistoryLocationId,
              assetId: element.assetId,
              employeeId: element.employeeId,
              assetname: this.assets.find(x => x.assetId == element.assetId).name,
              employeename: this.employees.find(x => x.employeeId == element.employeeId).name,
              employeesurname: this.employees.find(x => x.employeeId == element.employeeId).surname,
              date: element.date,
              warehouseId: null,
              warehouseaddress: '',
              employeeaddress: this.employees.find(x => x.employeeId == element.employeeId).homeAddress,
              warehousename:''
            }
            this.locations.push(this.item);
          }

        });


        //If the warehouseId has a value but employeeId has no value we assume the asset was at the warehouse
        //If the warehouseId has no value but employeeId has a value we assume the asset was checked out
        //If the warehouseId has a value but employeeId has a value we assume the asset was checked in

        this.locations.forEach(element => {
          if (element.warehouseId != null && element.employeeId == null)
          {
            this.events = [
              {
                status: element.warehousename,
                address:element.warehouseaddress,
                date: moment(new Date(element.date)).format('ddd DD MMM YYYY HH:mm'),
              }]
          }
     
          if (element.warehouseId == null && element.employeeId != null)
          {
            this.value =
              {
                status: "Checked Out by "+element.employeename+ ' '+ element.employeesurname,
                address:element.employeeaddress,
                date: moment(new Date(element.date)).format('ddd DD MMM YYYY HH:mm'),
              }
              this.events.push(this.value)
          }

          if (element.warehouseId != null && element.employeeId != null)
          {
            this.value =
              {
                status: "Checked In by "+element.employeename+ ' '+ element.employeesurname,
                address:"",
                date: moment(new Date(element.date)).format('ddd DD MMM YYYY  HH:mm'),
              }
              this.events.push(this.value)

              this.value =
              {
                status: "Returned to "+element.warehousename,
                address:element.warehouseaddress,
                date: moment(new Date(element.date)).format('ddd DD MMM YYYY'),
              }
              this.events.push(this.value)           
          } 
        });

        })
      })
    })
  })
}

}
