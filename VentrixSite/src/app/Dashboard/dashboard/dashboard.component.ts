import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Asset } from 'src/app/shared/Asset';
import { Depreciation } from 'src/app/shared/Depreciation';
import { Account } from 'src/app/shared/Account';
import { DepreciationReport } from 'src/app/shared/DepreciationReport';
import { saveAs } from 'file-saver';
import { AssetVM } from 'src/app/shared/AssetVM';
import { SupplierOrder } from 'src/app/shared/SupplierOrder';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { ClientOrder } from 'src/app/shared/ClientOrder';
import { Client } from 'src/app/shared/Client';
import { InventoryManagmenet } from 'src/app/shared/InventoryManagment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(public ventrixdbservice: VentrixDBServiceService) { }
  account!:Account;
  assignedassets!:number;
  unassignedassets!:number;
  assets:any[] = [];
  warranties:any[] = [];
  types:any[] = [];
  filtertypes:any[] = [];
  categories:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  item!:AssetVM;
  type:any;
  assetItems:AssetVM[] = [];
  conditions:any[] = [];
  warrantyperiods:any[] = [];
  warranty!: any;
  warehouses:any[] = [];
  repairs:any[] = [];
  percentageassinged!:number;
  percentageunassigned!:number;
  assetvalue!:number;
  totalsupplierorder!:number;
  supplierOrders:SupplierOrder[] = [];
  clientOrdersStatuses:ClientOrderStatus[] = [];
  clientOrderVM:ClientOrderVM[] = [];
  temp!:ClientOrderStatus;
  clientOrders:ClientOrder[] = [];
  order!: ClientOrderVM;
  client:Client|undefined;
  totalclientrorder!:number;
  totalcompleted!:number;
  clients: any[] = [];
  totaladded!:number;
  totalprocessed!:number;
  totalscheduled!:number;
  totalrescheduled!:number;
  totalcollected!:number;
  percentageadded!:number;
  percentageprocessed!:number;
  percentagepacked!:number;
  percentagescheduled!:number;
  percentagerescheduled!:number;
  percentageredelivered!:number;
  totalpacked!:number;
  data:number[] = [];
  labels:string[] = [];
  totalcategory!:number;
  items:InventoryManagmenet[] = [];
  barChartOptions : ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  }
//Bar Chart Demand
barChartLabels: Label[] = [];
barChartType: Chart.ChartType = 'bar';
barChartLegend = false;
barChartPlugins = [];
public barChartColor: any[] = [
  { 
    backgroundColor:["rgba(80, 80, 80, 1)", "rgba(131, 127, 255, 1)", "rgba(173, 127, 255, 1)" , "rgba(235, 127, 255, 1)", "rgba(255, 127, 195, 1)" ] 
  }];

barChartData : SingleDataSet[] = [];


  ngOnInit(): void 
  {
    this.ventrixdbservice.setPage(1);
    this.account = this.ventrixdbservice.getAccount();
    this.assignedassets = 0;
    this.unassignedassets = 0;
    this.assetvalue = 0;
    this.totalclientrorder = 0;
    this.totalcompleted = 0;
    this.totalcollected = 0;
    this.totaladded = 0;
    this.totalprocessed = 0;
    this.totalprocessed = 0;
    this.totalpacked = 0;
    this.totalscheduled = 0;
    this.totalrescheduled = 0;
    this.percentageadded = 0;
    this.percentageprocessed = 0;
    this.percentagepacked = 0;
    this.percentagerescheduled = 0;
    this.percentagerescheduled = 0;
    this.percentageredelivered = 0;
    this.labels = [];
    this.totalcategory = 0;

    //Get Assigned Assets
    //Get asset from api
    this.ventrixdbservice.readAsset()
    .subscribe(response => {
      this.assets = response;

        //In the event there no assets
        if (this.assets.length != 0)
        {
            //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
            this.ventrixdbservice.readAssetType()
            .subscribe(response => {
              this.types = response;

                this.ventrixdbservice.readAssetCategory()
                .subscribe(response => {
                  this.categories = response;

                  this.categories.forEach(category => {
                    this.totalcategory = 0;
                    this.filtertypes = this.types.filter(x => x.assetCategoryId == category.assetCategoryId);
                    this.filtertypes.forEach(type => {

                      this.assets.forEach(element => {
                        if(element.assetTypeId == type.assetTypeId)
                        {
                          this.totalcategory = this.totalcategory+element.value;
                        }
                      });
                    });

                    if (this.totalcategory != 0)
                    {
                      this.items.push({Name: category.description, Quantity: this.totalcategory});
                    }
                  });


                    //Orders in ascending orders
                    this.items.sort(function(x,y) {
                      if (x.Quantity < y.Quantity) {
                          return 1;
                      }
                  
                      if (x.Quantity > y.Quantity) {
                          return -1;
                      }
                      return 0;
                  });

                  if (this.items.length < 5)
                  {
                    //Only displays top 5 results 
                    for (var i = 0; i < this.items.length ; i++)
                    {
                      this.data.push(Number(this.items[i].Quantity));
                      this.labels.push(this.items[i].Name);
                    }
                  }
                  else
                  {
                    for (var i = 0; i <= 5; i++)
                    {
                      this.data.push(Number(this.items[i].Quantity));
                      this.labels.push(this.items[i].Name);
                    }
                  }

                  this.barChartLabels = this.labels;
                  this.barChartData = [this.data];

                  this.ventrixdbservice.readWarrantyPeriod()
                  .subscribe(response => {
                    this.warrantyperiods = response;

                    this.ventrixdbservice.readCondition()
                    .subscribe(response => {
                      this.conditions = response;

                      this.ventrixdbservice.readWarranty()
                      .subscribe(response => {
                        this.warranties = response;


                        this.ventrixdbservice.readWarehouse()
                        .subscribe(response => {
                          this.warehouses = response;
                        
                        this.assets.forEach(asset => {
                        this.type = this.types.find(x => x.assetTypeId == asset.assetTypeId);
                        this.warranty = this.warranties.find(x => x.warrantyId == asset.warrantyId);

                        //New asset view model is assigned the retrived values from the api
                        this.item = 
                        {
                          assetId: asset.assetId,
                          conditionId: asset.conditionId,
                          warrantyId :asset.warrantyId,
                          assetTypeId:asset.assetTypeId,
                          warehouseId:asset.warehouseId,
                          manufacturer:asset.manufacturer,
                          name: asset.name,
                          type: this.types.find(x => x.assetTypeId == this.type.assetTypeId).description,
                          category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId).description,
                          warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                          condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                          warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                          warrantyDate: this.warranty.date,
                          assetImage: asset.assetImage,
                          warrantyPeriodId: this.warranty.warrantyPeriodId,
                          assetCategoryId: this.type.assetCategoryId,
                          assetStatus: asset.assetStatus,
                          value: asset.value
                        }
                        //To get total asset value on the system
                        this.assetvalue = this.assetvalue+this.item.value;
                        //
                        this.assetItems.push(this.item)
                      })
                           
                      this.assetItems.forEach(element => {
                        if(element.assetStatus == "Assigned")
                        {
                          this.assignedassets = this.assignedassets+1;
                        }
                        else
                        {
                          this.unassignedassets = this.unassignedassets+1;
                        }
                      });

                      this.percentageassinged = Math.round(this.assignedassets / this.assetItems.length * 100);
                      this.percentageunassigned = Math.round(this.unassignedassets / this.assetItems.length* 100);
                  })
                })
                })
              })       
            })       
          });
        }
    })
    //

    //Get total of supplier orders
    this.ventrixdbservice.readSupplierOrder()
      .subscribe(
        response => 
        { 
          this.supplierOrders = response
          this.totalsupplierorder = this.supplierOrders.length; 
        });
    //

    //Get total client orders
    this.ventrixdbservice.readClientOrder()
    .subscribe(response => {
      this.clientOrders = response;

      this.ventrixdbservice.readClient()
      .subscribe(response => {
        this.clients = response

        this.ventrixdbservice.readClientOrderStatuses()
        .subscribe(response => {

        this.clients.forEach(c => {
        //Neccessary to get the most up-to-date status
        if (this.clientOrders.length != 0)
        {
          this.clientOrders.forEach(clientorder => {
          this.clientOrdersStatuses = [];


             if (c.clientId == clientorder.clientId)
             {
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
          

                this.order = 
                {
                  clientOrderId: clientorder.clientOrderId,
                  clientId: c.clientId,
                  description :clientorder.description,
                  clientInvoice: clientorder.clientInvoice,
                  contactPersonName : c.contactPersonName!,
                  contactPersonSurname: c.contactPersonSurname!,
                  emailAddress: c.emailAddress!,
                  status: this.temp.description,
                  encrypted:''
                }
                this.clientOrderVM.push(this.order);
                this.totalclientrorder = this.clientOrderVM.length;
             
             }
           });
        }
      })
          //Count amount of client order
          this.clientOrderVM.forEach(element => {
          if (element.status == "Delivered")
          {
            this.totalcompleted = this.totalcompleted+1;
          }    
          else if (element.status == "Collected")
          {
            this.totalcollected = this.totalcollected+1;
          }      
          else if (element.status == "Added")
          {
            this.totaladded = this.totaladded+1;
          }  
          else if (element.status == "Processed")
          {
            this.totalprocessed = this.totalprocessed+1;
          }  
          else if (element.status == "Scheduled")
          {
            this.totalscheduled = this.totalscheduled+1;
          } 
          else if (element.status == "Rescheduled")
          {
            this.totalrescheduled = this.totalrescheduled+1;
          } 
          else if (element.status == "Packed")
          {
            this.totalpacked = this.totalpacked+1;
          } 
        });

        this.percentageadded = Math.round(this.totaladded / this.clientOrderVM.length * 100);
        this.percentageprocessed = Math.round(this.totalprocessed / this.clientOrderVM.length * 100);
        this.percentagepacked = Math.round(this.totalpacked / this.clientOrderVM.length * 100);
        this.percentagescheduled = Math.round(this.totalscheduled / this.clientOrderVM.length * 100);
        this.percentagerescheduled = Math.round(this.totalrescheduled / this.clientOrderVM.length * 100);
        this.percentageredelivered = Math.round(this.totalcompleted / this.clientOrderVM.length * 100);

        })
      })
    });
    //
  }
}
