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
import { Account } from 'src/app/shared/Account';
import { saveAs } from 'file-saver';
import { DemandReport } from 'src/app/shared/DemandReport';

@Component({
  selector: 'app-supply-demand-report',
  templateUrl: './supply-demand-report.component.html',
  styleUrls: ['./supply-demand-report.component.css']
})
export class SupplyDemandReportComponent implements OnInit {
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

  inventories:Inventory[] = [];
  inventory!:Inventory;
  clientorderlines:ClientOrderLineR[] = [];
  items:InventoryManagmenet[] = [];
  itemclientorderlines:ClientOrderLineR[] = [];
  data:number[] = [];
  labels:string[] = [];
  total!: number;
  selectedMonth!:Month;
  clientlines: any[] = [];
  found!: number;
  year!: Number;
  account!:Account;
  date!:Date;
  demandselected = true;
  itemsupplierorderlines:SupplierOrderLineR[] = [];
  supplierorderlines:SupplierOrderLineR[] = [];
  report!:DemandReport;
  barChartOptions : ChartOptions = {
    responsive: true
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

public pieChartColor: any[] = [
  { 
    backgroundColor:["rgba(80, 80, 80, 1)", "rgba(131, 127, 255, 1)", "rgba(173, 127, 255, 1)" , "rgba(235, 127, 255, 1)", "rgba(255, 127, 195, 1)" ] 
  }];
barChartData : SingleDataSet[] = [];

//Doughnut Chart Supply
doughnutChartLabels: Label[] = [];
doughnutChartData: SingleDataSet[] = [];

doughnutChartType: ChartType = 'doughnut';

constructor(public ventrixdbservice: VentrixDBServiceService,) { }
ngOnInit(): void 
{
  //Inorder to display who generated it 
  this.account = this.ventrixdbservice.getAccount();

  //To display date
  this.date = new Date();
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
  this.data = [];
  this.labels = [];

  if(this.demandselected == true)
  {
    if (this.selectedMonth != undefined)
    {
      //Loops through each inventory item and calculates total amount for that inventory item used for that specific month for the current year
      this.ventrixdbservice.readInventory()
      .subscribe(response => {
        this.inventories = response;
    
        this.ventrixdbservice.readClientOrderLine()
        .subscribe(response => { 
          this.clientorderlines = response;   
    
        this.inventories.forEach(element => {
        this.inventory = element;
    
        this.total = 0;
        
            this.clientorderlines.forEach(element => {
              if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
              {
                this.found = this.found + 1;
                this.total = this.total + Number(element.quantity);     
              }
            });
            this.items.push({Name: this.inventory.name, Quantity: this.total});
          });
    
          if(this.found != 0)
          {
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
          }
    
          if(this.found != 0)
          {
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
            for (var i = 0; i < 5; i++)
            {
              this.data.push(Number(this.items[i].Quantity));
              this.labels.push(this.items[i].Name);
            }
          }
        }
          this.barChartLabels = this.labels;
          this.barChartData = [this.data];
          console.log(this.data)
        });
      });
    }
  }

  if (this.demandselected == false)
  {
    if (this.selectedMonth != undefined)
    {
      //Loops through each inventory item and calculates total amount for that inventory item used for that specific month for the current year
      this.ventrixdbservice.readInventory()
      .subscribe(response => {
        this.inventories = response;
    
        this.ventrixdbservice.readSupplierOrderLine()
        .subscribe(response => { 
          this.supplierorderlines = response;   
    
        this.inventories.forEach(element => {
        this.inventory = element;
    
        this.total = 0;
        
            this.supplierorderlines.forEach(element => {
              if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
              {
                this.found = this.found + 1;
                this.total = this.total + Number(element.quantity);     
              }
            });
            this.items.push({Name: this.inventory.name, Quantity: this.total});
          });
    
          if(this.found != 0)
          {
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
          }
    
          if(this.found != 0)
          {
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
            for (var i = 0; i < 5; i++)
            {
              this.data.push(Number(this.items[i].Quantity));
              this.labels.push(this.items[i].Name);
            }
          }
        }
          this.doughnutChartLabels = this.labels;
          this.doughnutChartData = [this.data];
        });
      });
    }
  }

}

// PDF Options
  openDemandPDF(){
  let Data = document.getElementById('htmlData')!;

  html2canvas(Data).then(canvas => {
    let fileWidth = 210;
    let fileHeight = canvas.height * fileWidth / canvas.width;

    const contentDataUrl = canvas.toDataURL('image/png');

    let PDF = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    let topPosition = 10;
    let leftPosition = 0;

    PDF.addImage(contentDataUrl, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
    PDF.save('Demand Report.pdf');
  }

  )
}

 openSupplyPDF(){
  let Data = document.getElementById('htmlData2')!;

  html2canvas(Data).then(canvas => {
    let fileWidth = 210;
    let fileHeight = canvas.height * fileWidth / canvas.width;

    const contentDataUrl = canvas.toDataURL('image/png');

    let PDF = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    let topPosition = 10;
    let leftPosition = 0;

    PDF.addImage(contentDataUrl, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
    PDF.save('Supply Report.pdf');
  }

  )
}

generateExcel()
{
  if (this.demandselected == true && this.data.length != 0)
  {
    this.report = 
    {
      items: this.labels,
      values: this.data,
      account: this.account.name+' '+this.account.surname,
      month: this.selectedMonth.Name,
    }
    this.ventrixdbservice.generateExcelDemandReport(this.report).subscribe(res => {
      const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
     saveAs(data,"Demand Report");
   });
  }

  if (this.demandselected == false && this.data.length != 0)
  {
    this.report = 
    {
      items: this.labels,
      values: this.data,
      account: this.account.name+' '+this.account.surname,
      month: this.selectedMonth.Name,
    }
    this.ventrixdbservice.generateExcelSupplyReport(this.report).subscribe(res => {
      const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
     saveAs(data,"Supply Report");
   });
  }


}

}

