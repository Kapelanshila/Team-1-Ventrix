import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { Month } from 'src/app/shared/Month';
import { Color } from 'ng2-charts';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Asset } from 'src/app/shared/Asset';
import { Inventory } from 'src/app/shared/Inventory';
import { ClientOrderLine } from 'src/app/shared/ClientOrderLine';
import { InventoryManagmenet } from 'src/app/shared/InventoryManagment';
import { ClientOrderLineR } from 'src/app/shared/ClientOrderLinR';
import { SupplierOrderLineR } from 'src/app/shared/SupplierOrderLineR';
import { ClientOrder } from 'src/app/shared/ClientOrder';
import { SupplierOrder } from 'src/app/shared/SupplierOrder';
import { DeliveryTimeslot } from 'src/app/shared/DeliveryTimeslot';
import { Timeslot } from 'src/app/shared/Timeslot';
import { TimeSlotDate } from 'src/app/shared/TimeSlotDate';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { OrderDelivery } from 'src/app/shared/OrderDelivery';
import { Account } from 'src/app/shared/Account';
import { saveAs } from 'file-saver';
import { ManagementReport } from 'src/app/shared/ManagementReport';

@Component({
  selector: 'app-management-report',
  templateUrl: './management-report.component.html',
  styleUrls: ['./management-report.component.css']
})
export class ManagementReportComponent implements OnInit {
months: Month[] = [
  {Name: 'January', Value: 1},
  {Name: 'Febuary', Value: 2},
  {Name: 'March', Value: 3},
  {Name: 'April', Value: 4},
  {Name: 'May', Value: 5},
  {Name: 'June', Value: 6},
  {Name: 'July', Value: 7},
  {Name: 'August', Value: 8},
  {Name: 'September', Value: 9},
  {Name: 'October', Value: 10},
  {Name: 'November', Value: 11},
  {Name: 'December', Value: 12}
  ];  

  totalactualtime!:number;
  totalallocatedtime!:number;
  inventories:Inventory[] = [];
  inventory!:Inventory;
  clientorderlines:ClientOrderLineR[] = [];
  items:InventoryManagmenet[] = [];
  itemclientorderlines:ClientOrderLineR[] = [];
  data:number[] = [];
  labels:string[] = [];
  suppliertotal!: number;
  clienttotal!: number;
  selectedMonth!:Month;
  clientlines: any[] = [];
  found!: number;
  year!: Number;
  count!:number;
  demandselected = true;
  itemsupplierorderlines:SupplierOrderLineR[] = [];
  supplierorderlines:SupplierOrderLineR[] = [];
  clientorders:ClientOrder[] = [];
  supplierOrders:SupplierOrder[] = [];
  cline:ClientOrderLineR | undefined;
  sline:SupplierOrderLineR | undefined;
  deliverytimeslots:DeliveryTimeslot[] =[];
  timeslots:Timeslot[] = [];
  timeslotdates:TimeSlotDate[] = [];
  clientorderstatuses:ClientOrderStatus[] = [];
  orderDelivery:OrderDelivery[] = [];
  time!:Timeslot;
  date!:TimeSlotDate;
  delivery!:OrderDelivery;
  effiency!:number;
  client!:number;
  supplier!:number;
  account!:Account;
  currentdate!:Date;
  report!:ManagementReport;

  barChartOptions : ChartOptions = {
    responsive: true
  }

public pieChartColor: any[] = [
  { 
    backgroundColor:["rgba(80, 80, 80, 1)", "rgba(131, 127, 255, 1)", "rgba(173, 127, 255, 1)" , "rgba(235, 127, 255, 1)", "rgba(255, 127, 195, 1)" ] 
  }];


//Doughnut Chart Supply
doughnutChartLabels: Label[] = [];
doughnutChartData: SingleDataSet[] = [];

doughnutChartType: ChartType = 'pie';

constructor(public ventrixdbservice: VentrixDBServiceService,) { }
ngOnInit(): void 
{
    //Inorder to display who generated it 
    this.account = this.ventrixdbservice.getAccount();

    //To display date
    this.currentdate = new Date();
    
  this.year = new Date().getFullYear()
}

demandclick()
{
  this.demandselected = true;
  this.monthChange();
}

supplyclick()
{
  this.demandselected = false;
  this.monthChange();
}


monthChange()
{
  this.items = [];
  this.found = 0;
  this.count = 0;
  this.data = [];
  this.labels = [];
  this.totalactualtime = 0;
  this.totalallocatedtime = 0;
  this.effiency = 0;
  if (this.selectedMonth != undefined)
    {
      //Percentage Effeciency of deliveries 
      //Effeciency of deliveries is based on the total provided time with time slots and the actual amount of time drrivers took 

      this.ventrixdbservice.readClientOrder()
      .subscribe(response => { 
        this.clientorders = response;   

        this.ventrixdbservice.readClientOrderStatuses()
        .subscribe(response => { 
          this.clientorderstatuses = response;   

          this.ventrixdbservice.readOrderDeliveries()
          .subscribe(response => { 
            this.orderDelivery = response;   

            this.ventrixdbservice.readDeliveryTimeslots()
            .subscribe(response => { 
              this.deliverytimeslots = response;   

          this.ventrixdbservice.readTimeslots()
          .subscribe(response => { 
            this.timeslots = response;   

            this.ventrixdbservice.readTimeslotDates()
            .subscribe(response => { 
              this.timeslotdates = response;  

              this.clientorders.forEach(order => {
                this.clientorderstatuses.forEach(status => {
              
              
              if (order.clientOrderId == status.clientOrderId && status.description == "Delivered")
              {
                this.delivery = this.orderDelivery.find(x => x.clientOrderId == order.clientOrderId)!;
                this.time = this.timeslots.find(x => x.timeslotId == this.delivery.timeslotId)!;
                this.date = this.timeslotdates.find(x => x.dateId == this.delivery.dateId)!;
                this.count = this.count + 1;
                console.log(new Date(this.time.endTime))
                console.log(new Date(this.time.endTime).getTime())
                console.log(new Date(new Date(status.date)))
                console.log(new Date(new Date(status.date)).getTime())

                //Calculate total time
                this.totalallocatedtime = this.totalallocatedtime + (new Date(this.time.endTime).getTime() - new Date(this.time.startTime).getTime());
                //Calculate allocated time 

                if (new Date(this.time.endTime).getTime() < new Date(status.date).getTime()) 
                {
                  console.log(new Date(this.time.endTime).getTime() - new Date(status.date).getTime())
                  this.totalactualtime = + this.totalactualtime + (new Date(this.time.endTime).getTime() - new Date(status.date).getTime());
                }
                else
                {
                  this.totalactualtime =  this.totalactualtime + (new Date(this.time.endTime).getTime() - new Date(this.time.startTime).getTime());
                }
              } 
            });
          });
          console.log(this.totalallocatedtime)
          console.log(this.totalactualtime)

            if (this.totalactualtime == undefined)
            {
              this.effiency = 0;
            }
            else
            {
              this.effiency = this.totalactualtime/this.totalallocatedtime*100;
              this.effiency = Math.round(this.effiency);
            }

      //Gets total client and supplier orders processed for that current month
      this.ventrixdbservice.readSupplierOrder()
      .subscribe(response => { 
        this.supplierOrders = response;   

        this.ventrixdbservice.readSupplierOrderLine()
        .subscribe(response => { 
          this.supplierorderlines = response;   
    
        this.ventrixdbservice.readClientOrderLine()
        .subscribe(response => { 
          this.clientorderlines = response;   
    
        this.suppliertotal = 0;
        
            this.supplierOrders.forEach(element => {
              this.sline = this.supplierorderlines.find(x => x.supplierOrderId == element.supplierOrderId);
              if(this.sline != undefined)
              {
                if (new Date().getFullYear() == new Date(this.sline!.date).getFullYear() && this.selectedMonth.Value == new Date(this.sline!.date).getMonth()+1)
                {
                  this.suppliertotal = this.suppliertotal + 1;    
                }
              }
            });

 
            this.clienttotal = 0;
            
              this.clientorders.forEach(element => {
                this.cline = this.clientorderlines.find(x => x.clientOrderId == element.clientOrderId);
                if(this.cline != undefined)
                {
                  if (new Date().getFullYear() == new Date(this.cline!.date).getFullYear() && this.selectedMonth.Value == new Date(this.cline!.date).getMonth()+1)
                  {
                    this.clienttotal = this.clienttotal + 1;     
                  }
                }
              });

              //Takes total percentage fo orders that were client orders and supplier orders
              if (this.suppliertotal != 0)
              {
                this.data.push(Math.round(this.suppliertotal / (this.suppliertotal+this.clienttotal) * 100));
                this.supplier = Math.round(this.suppliertotal / (this.suppliertotal+this.clienttotal) * 100);
                this.labels.push('Total % Supplier Orders');  
              }

              if (this.clienttotal  != 0)
              {
                this.client = Math.round(this.clienttotal / (this.suppliertotal+this.clienttotal) * 100);
                this.data.push(Math.round(this.clienttotal / (this.suppliertotal+this.clienttotal) * 100));
                this.labels.push('Total % Client Orders');
              }

          this.doughnutChartLabels = this.labels;
          this.doughnutChartData = [this.data];
          console.log(this.data)
        });
      });
    });
  });
});
});
});
});
});
  }
}

// PDF Options
openPDF(){
  let Data = document.getElementById('htmlData')!;

  html2canvas(Data).then(canvas => {
    let fileWidth = 210;
    let fileHeight = canvas.height * fileWidth / canvas.width;

    const contentDataUrl = canvas.toDataURL('image/png');

    this.report = 
    {
      client: this.client,
      supplier: this.supplier,
      account: this.account.name+' '+this.account.surname,
      month: this.selectedMonth.Name,
      effciency: this.effiency,
      image:contentDataUrl
    }

    this.ventrixdbservice.generateManagmenetPDFReport(this.report)
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
     saveAs(data,"Management Report "+this.report.month+" "+ new Date().getFullYear());
   });
  }

  )
}


generateExcel()
{
  if (this.data.length != 0)
  {
    this.report = 
    {
      client: this.client,
      supplier: this.supplier,
      account: this.account.name+' '+this.account.surname,
      month: this.selectedMonth.Name,
      effciency: this.effiency,
      image:''
    }
    this.ventrixdbservice.generateExcelManagementReport(this.report).subscribe(res => {
      const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
     saveAs(data,"Management Report");
   });
  }
}
}
