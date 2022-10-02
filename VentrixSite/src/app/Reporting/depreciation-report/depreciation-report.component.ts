import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Color, Label } from 'ng2-charts';
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

@Component({
  selector: 'app-depreciation-report',
  templateUrl: './depreciation-report.component.html',
  styleUrls: ['./depreciation-report.component.css']
})
export class DepreciationReportComponent implements OnInit {

    assets!:Asset[];
    selectedAsset:any;
    depreciation!:Depreciation;
    percentage!: number;
    values:number[] = [];
    assetvalue!:number;
    year = 0;
    hide = false;
    residual!: number;
    label!: string;
    labels: string[] = [];
    account!:Account;
    date!:Date;
    lineChartData: Chart.ChartDataSets[] = [];
    report!: DepreciationReport;
    lineChartLabels: Label[] = [];

    lineChartOptions = {
      responsive: true,
    };

  public lineChartColors: Color[] = [
    
    { // purple
      backgroundColor: 'rgba(139, 0, 220, 0.29)',
      borderColor: 'rgba(139, 0, 220, 0.69)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor(public ventrixdbservice: VentrixDBServiceService,) { }
  ngOnInit(): void {
          //Inorder to display who generated it 
          this.account = this.ventrixdbservice.getAccount();

          //To display date
          this.date = new Date();
    
    this.ventrixdbservice.readAsset()
    .subscribe(response => {
      this.assets = response;
    });
  }

// PDF Options

public openPDF():void {
  this.hide = true;
  let Data = document.getElementById('htmlData')!;

// Canvas Options
  html2canvas(Data).then(canvas => {
      let fileWidth = 210;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')

      this.report = 
      {
        years: this.labels,
        values: this.values,
        account: this.account.name+' '+this.account.surname,
        asset: this.selectedAsset.name,
        depreciation: Number(this.depreciation.percentage),
        image: contentDataURL
      }

      this.ventrixdbservice.generateDepreciationPDFReport(this.report)
      .subscribe(res => {
        const data = new Blob([res] , { type: 'application/pdf' });
       saveAs(data,"Demand Report "+this.report.asset);
     });
     this.hide = false;
  });
}

gatherdata()
{
  this.values = [];
  this.year = 0;
  this.labels = [];
  if (this.selectedAsset != null)
  {
    //Gets percentage value
    this.ventrixdbservice.readDepreciation()
    .subscribe(response => {
      this.depreciation = response[0];
      this.percentage = Number(this.depreciation.percentage)/100;

      //Depreciation straight line method calculation
      //Depreciates asset value indefinelty until value is less than 0 
      this.assetvalue = this.selectedAsset.value;
      //Calculate fixed depreciation coost of asset since its straight line method
      this.residual = this.assetvalue * this.percentage;

      this.values.push(this.assetvalue);
      this.labels.push('0');

      while (this.assetvalue > 0)
      {          
        this.assetvalue = this.assetvalue - this.residual;
        if (this.assetvalue > 0)
        {
          this.year= this.year+1;
          this.values.push(this.assetvalue);
          //If statement to decide whether to diplay "year" or "years"
          if (this.year == 1)
          {
            this.labels.push(this.year.toString()+' Year');

          }
          else
          {
            this.labels.push(this.year.toString()+' Years');
          }
        }
      }
      this.lineChartData = [{ data: this.values, label: this.selectedAsset.name}];
      this.lineChartLabels = this.labels;

      console.log(this.values);
      console.log(this.labels);
      this.report = 
      {
        years: this.labels,
        values: this.values,
        account: this.account.name+' '+this.account.surname,
        asset: this.selectedAsset.name,
        depreciation: Number(this.depreciation.percentage),
        image: ''
      }
    });
  }
}

generateExcel()
{
  this.ventrixdbservice.generateExcelDepreciationReport(this.report).subscribe(res => {
    const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
   saveAs(data,"Depreciaiton Report");
 });
}
}
