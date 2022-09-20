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
import { InventoryType } from 'src/app/shared/InventoryType';
import { InventoryCategory } from 'src/app/shared/InventoryCategory';
import { TransactionReport } from 'src/app/shared/TransactionReport';

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

  filters: Month[] = [
    {Name: 'Category', Value: 1},
    {Name: 'Type', Value: 2},
    {Name: 'Inventory Items', Value: 3},
    ];  

  inventories:Inventory[] = [];
  inventory!:Inventory;
  types:InventoryType[] = [];
  clientorderlines:ClientOrderLineR[] = [];
  items:InventoryManagmenet[] = [];
  filteritems:InventoryManagmenet[] = [];
  itemclientorderlines:ClientOrderLineR[] = [];
  data:number[] = [];
  labels:string[] = [];
  total!: number;
  type!:InventoryType;
  categories:InventoryCategory[] = [];
  Fulltotal!: number;
  selectedMonth!:Month;
  selectedFilter!:Month;
  clientlines: any[] = [];
  found!: number;
  vm:TransactionReport[] = [];
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

filterChange()
{
  this.items = [];
  this.filteritems = [];
  this.found = 0;
  this.data = [];
  this.labels = [];
  this.Fulltotal = 0;
  this.vm = [];
  if (this.selectedFilter.Value == 1)
  {
    if(this.demandselected == true)
    {
      if (this.selectedMonth != undefined)
      {
        //Loops through each inventory item and calculates total amount for that inventory item used for that specific month for the current year
        this.ventrixdbservice.readInventory()
        .subscribe(response => {
          this.inventories = response;

          this.ventrixdbservice.readInventoryCategory()
          .subscribe(response => {
            this.categories = response;

            this.ventrixdbservice.readInventoryType()
            .subscribe(response => {
              this.types = response;
      
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => { 
            this.clientorderlines = response;   
      
          this.categories.forEach(category => {
            this.total = 0;

            this.inventories.forEach(element => {
              this.inventory = element;
              this.type = this.types.find(x => x.inventoryTypeId == this.inventory.inventoryTypeId)!;
              
              if(this.type.inventoryCategoryId == category.inventoryCategoryId)
              {
                this.clientorderlines.forEach(element => {
                      if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
                      {
                        this.found = this.found + 1;
                        this.total = this.total + Number(element.quantity);     
                      }
                  });
                }
              });
                this.items.push({Name: category.description.toString(), Quantity: this.total});
                this.Fulltotal = this.Fulltotal + this.total;     
            });
      
            console.log(this.items)
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }


            this.barChartLabels = this.labels;
            this.barChartData = [this.data];
            console.log(this.data.length)
          });
        });
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

          this.ventrixdbservice.readInventoryCategory()
          .subscribe(response => {
            this.categories = response;

            this.ventrixdbservice.readInventoryType()
            .subscribe(response => {
              this.types = response;
      
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => { 
            this.clientorderlines = response;   
      
          this.categories.forEach(category => {
            this.total = 0;

            this.inventories.forEach(element => {
              this.inventory = element;
              this.type = this.types.find(x => x.inventoryTypeId == this.inventory.inventoryTypeId)!;
              
              if(this.type.inventoryCategoryId == category.inventoryCategoryId)
              {
                this.clientorderlines.forEach(element => {
                      if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
                      {
                        this.found = this.found + 1;
                        this.total = this.total + Number(element.quantity);     
                      }
                  });
                }
              });
                this.items.push({Name: category.description.toString(), Quantity: this.total});
                this.Fulltotal = this.Fulltotal + this.total;     
            });
      
            console.log(this.items)
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.doughnutChartLabels = this.labels;
            this.doughnutChartData = [this.data];
            console.log(this.data.length)
          });
        });
      });
    });
      }
    }
  }

  if (this.selectedFilter.Value == 2)
  {
    if(this.demandselected == true)
    {
      if (this.selectedMonth != undefined)
      {
        //Loops through each inventory item and calculates total amount for that inventory item used for that specific month for the current year
        this.ventrixdbservice.readInventory()
        .subscribe(response => {
          this.inventories = response;

          this.ventrixdbservice.readInventoryType()
          .subscribe(response => {
            this.types = response;
      
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => { 
            this.clientorderlines = response;   
      
          this.types.forEach(type => {
            this.total = 0;

            this.inventories.forEach(element => {
              this.inventory = element;

              
              if(this.inventory.inventoryTypeId == type.inventoryTypeId)
              {
                this.clientorderlines.forEach(element => {
                      if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
                      {
                        this.found = this.found + 1;
                        this.total = this.total + Number(element.quantity);     
                      }
                  });
                }
              });
                this.items.push({Name: type.description.toString(), Quantity: this.total});
                this.Fulltotal = this.Fulltotal + this.total;     
            });
      
            console.log(this.items)
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.barChartLabels = this.labels;
            this.barChartData = [this.data];
            console.log(this.data.length)
          });
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

          this.ventrixdbservice.readInventoryType()
          .subscribe(response => {
            this.types = response;
      
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => { 
            this.clientorderlines = response;   
      
          this.types.forEach(type => {
            this.total = 0;

            this.inventories.forEach(element => {
              this.inventory = element;

              
              if(this.inventory.inventoryTypeId == type.inventoryTypeId)
              {
                this.clientorderlines.forEach(element => {
                      if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
                      {
                        this.found = this.found + 1;
                        this.total = this.total + Number(element.quantity);     
                      }
                  });
                }
              });
                this.items.push({Name: type.description.toString(), Quantity: this.total});
                this.Fulltotal = this.Fulltotal + this.total;     
            });
      
            console.log(this.items)
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.doughnutChartLabels = this.labels;
            this.doughnutChartData = [this.data];
            console.log(this.data.length)
          });
        });
      });
      }
    }
  }

  
  if (this.selectedFilter.Value == 3)
  {
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
              this.Fulltotal = this.Fulltotal + this.total;     
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.barChartLabels = this.labels;
            this.barChartData = [this.data];
            console.log(this.data.length)
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
              this.Fulltotal = this.Fulltotal + this.total;     
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

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
  
}

monthChange()
{
  this.items = [];
  this.filteritems = [];
  this.found = 0;
  this.data = [];
  this.labels = [];
  this.Fulltotal = 0;
  this.vm = [];
  console.log(this.selectedFilter)
  
  if (this.selectedFilter == undefined)
  {
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
              this.Fulltotal = this.Fulltotal + this.total;     
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.barChartLabels = this.labels;
            this.barChartData = [this.data];
            console.log(this.data.length)
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
              this.Fulltotal = this.Fulltotal + this.total;     
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

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
  else
  {
  if (this.selectedFilter.Value == 1)
  {
    if(this.demandselected == true)
    {
      if (this.selectedMonth != undefined)
      {
        //Loops through each inventory item and calculates total amount for that inventory item used for that specific month for the current year
        this.ventrixdbservice.readInventory()
        .subscribe(response => {
          this.inventories = response;

          this.ventrixdbservice.readInventoryCategory()
          .subscribe(response => {
            this.categories = response;

            this.ventrixdbservice.readInventoryType()
            .subscribe(response => {
              this.types = response;
      
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => { 
            this.clientorderlines = response;   
      
          this.categories.forEach(category => {
            this.total = 0;

            this.inventories.forEach(element => {
              this.inventory = element;
              this.type = this.types.find(x => x.inventoryTypeId == this.inventory.inventoryTypeId)!;
              
              if(this.type.inventoryCategoryId == category.inventoryCategoryId)
              {
                this.clientorderlines.forEach(element => {
                      if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
                      {
                        this.found = this.found + 1;
                        this.total = this.total + Number(element.quantity);     
                      }
                  });
                }
              });
                this.items.push({Name: category.description.toString(), Quantity: this.total});
                this.Fulltotal = this.Fulltotal + this.total;     
            });
      
            console.log(this.items)
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }


            this.barChartLabels = this.labels;
            this.barChartData = [this.data];
            console.log(this.data.length)
          });
        });
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

          this.ventrixdbservice.readInventoryCategory()
          .subscribe(response => {
            this.categories = response;

            this.ventrixdbservice.readInventoryType()
            .subscribe(response => {
              this.types = response;
      
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => { 
            this.clientorderlines = response;   
      
          this.categories.forEach(category => {
            this.total = 0;

            this.inventories.forEach(element => {
              this.inventory = element;
              this.type = this.types.find(x => x.inventoryTypeId == this.inventory.inventoryTypeId)!;
              
              if(this.type.inventoryCategoryId == category.inventoryCategoryId)
              {
                this.clientorderlines.forEach(element => {
                      if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
                      {
                        this.found = this.found + 1;
                        this.total = this.total + Number(element.quantity);     
                      }
                  });
                }
              });
                this.items.push({Name: category.description.toString(), Quantity: this.total});
                this.Fulltotal = this.Fulltotal + this.total;     
            });
      
            console.log(this.items)
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.doughnutChartLabels = this.labels;
            this.doughnutChartData = [this.data];
            console.log(this.data.length)
          });
        });
      });
    });
      }
    }
  }

  if (this.selectedFilter.Value == 2)
  {
    if(this.demandselected == true)
    {
      if (this.selectedMonth != undefined)
      {
        //Loops through each inventory item and calculates total amount for that inventory item used for that specific month for the current year
        this.ventrixdbservice.readInventory()
        .subscribe(response => {
          this.inventories = response;

          this.ventrixdbservice.readInventoryType()
          .subscribe(response => {
            this.types = response;
      
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => { 
            this.clientorderlines = response;   
      
          this.types.forEach(type => {
            this.total = 0;

            this.inventories.forEach(element => {
              this.inventory = element;

              
              if(this.inventory.inventoryTypeId == type.inventoryTypeId)
              {
                this.clientorderlines.forEach(element => {
                      if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
                      {
                        this.found = this.found + 1;
                        this.total = this.total + Number(element.quantity);     
                      }
                  });
                }
              });
                this.items.push({Name: type.description.toString(), Quantity: this.total});
                this.Fulltotal = this.Fulltotal + this.total;     
            });
      
            console.log(this.items)
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.barChartLabels = this.labels;
            this.barChartData = [this.data];
            console.log(this.data.length)
          });
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

          this.ventrixdbservice.readInventoryType()
          .subscribe(response => {
            this.types = response;
      
          this.ventrixdbservice.readClientOrderLine()
          .subscribe(response => { 
            this.clientorderlines = response;   
      
          this.types.forEach(type => {
            this.total = 0;

            this.inventories.forEach(element => {
              this.inventory = element;

              
              if(this.inventory.inventoryTypeId == type.inventoryTypeId)
              {
                this.clientorderlines.forEach(element => {
                      if (new Date().getFullYear() == new Date(element.date).getFullYear() && this.selectedMonth.Value == new Date(element.date).getMonth()+1 && element.inventoryId == this.inventory.inventoryId)
                      {
                        this.found = this.found + 1;
                        this.total = this.total + Number(element.quantity);     
                      }
                  });
                }
              });
                this.items.push({Name: type.description.toString(), Quantity: this.total});
                this.Fulltotal = this.Fulltotal + this.total;     
            });
      
            console.log(this.items)
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.doughnutChartLabels = this.labels;
            this.doughnutChartData = [this.data];
            console.log(this.data.length)
          });
        });
      });
      }
    }
  }

  
  if (this.selectedFilter.Value == 3)
  {
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
              this.Fulltotal = this.Fulltotal + this.total;     
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

                }
              }
             }

            this.barChartLabels = this.labels;
            this.barChartData = [this.data];
            console.log(this.data.length)
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
              this.Fulltotal = this.Fulltotal + this.total;     
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
              for (var i = 0; i < 5 ; i++)
              {
                if (this.items[i].Quantity != 0)
                {
                  this.data.push(Number(this.items[i].Quantity));
                     this.labels.push(this.items[i].Name);
                  this.vm.push({Label: this.items[i].Name.toString(), Quantity: Number(this.items[i].Quantity)});

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
  }
}

// PDF Options
  openDemandPDF(){
  let Data = document.getElementById('htmlData')!;

  html2canvas(Data).then(canvas => {
    let fileWidth = 210;
    let fileHeight = canvas.height * fileWidth / canvas.width;

    const contentDataUrl = canvas.toDataURL('image/png');

    if (this.selectedFilter == undefined)
    {
      this.report = 
      {
        items: this.labels,
        values: this.data,
        account: this.account.name+' '+this.account.surname,
        month: this.selectedMonth.Name,
        image:contentDataUrl, 
        filter: 0,
        total: this.Fulltotal
      }
    }
    else
    {
      this.report = 
      {
        items: this.labels,
        values: this.data,
        account: this.account.name+' '+this.account.surname,
        month: this.selectedMonth.Name,
        image:contentDataUrl, 
        filter: this.selectedFilter.Value,
        total: this.Fulltotal
      }
    }


    this.ventrixdbservice.generateDemandPDFReport(this.report)
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
     saveAs(data,"Demand Report "+this.report.month+" "+ new Date().getFullYear());
   });
  }

  )
}

 openSupplyPDF(){
  let Data = document.getElementById('htmlData2')!;

  html2canvas(Data).then(canvas => {
    let fileWidth = 210;
    let fileHeight = canvas.height * fileWidth / canvas.width;

    const contentDataUrl = canvas.toDataURL('image/png');
    console.log(contentDataUrl)

    if (this.selectedFilter == undefined)
    {
      this.report = 
      {
        items: this.labels,
        values: this.data,
        account: this.account.name+' '+this.account.surname,
        month: this.selectedMonth.Name,
        image:contentDataUrl, 
        filter: 0,
        total: this.Fulltotal
      }
    }
    else
    {
      this.report = 
      {
        items: this.labels,
        values: this.data,
        account: this.account.name+' '+this.account.surname,
        month: this.selectedMonth.Name,
        image:contentDataUrl, 
        filter: this.selectedFilter.Value,
        total: this.Fulltotal
      }
    }
    this.ventrixdbservice.generateSupplyPDFReport(this.report)
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
      saveAs(data,"Supply Report "+this.report.month+" "+ new Date().getFullYear());
    });
    // let PDF = new jsPDF({
    //   orientation: 'p',
    //   unit: 'mm',
    //   format: 'a4'
    // });

    // let topPosition = 10;
    // let leftPosition = 0;

    // PDF.addImage(contentDataUrl, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
    
  }

  )
}



generateExcel()
{
  if (this.demandselected == true && this.data.length != 0)
  {
    if (this.selectedFilter == undefined)
    {
      this.report = 
      {
        items: this.labels,
        values: this.data,
        account: this.account.name+' '+this.account.surname,
        month: this.selectedMonth.Name,
        image:'',
        filter: 0,
        total: this.Fulltotal
      }
    }
    else
    {
      this.report = 
      {
        items: this.labels,
        values: this.data,
        account: this.account.name+' '+this.account.surname,
        month: this.selectedMonth.Name,
        image:'',
        filter: this.selectedFilter.Value,
        total: this.Fulltotal
      }
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
      image:'',
      filter: this.selectedFilter.Value,
      total: this.Fulltotal
    }
    this.ventrixdbservice.generateExcelSupplyReport(this.report).subscribe(res => {
      const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
     saveAs(data,"Supply Report");
   });
  }


}

}

