import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { InventoryVM } from 'src/app/shared/InventoryVM';
//Make sure swal is imported
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Account } from 'src/app/shared/Account';
import { InventoryReport } from 'src/app/shared/InventoryReport';
import { saveAs } from 'file-saver';
interface InventoryNode {
  name: string;
  children?: InventoryNode[];
}

interface child {
  name: string;
}

const TREE_DATA: InventoryNode[] =[];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router)  { }
  inventories:any[] = [];
  warehouses:any[] = [];
  suppliers:any[] = [];
  types:any[] = [];
  supplierorderline:any[] = [];
  clientorderline:any[] = [];
  categories:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  item!:InventoryReport;
  type:any;
  inventoryItems:any[] = [];
  inventorywriteoffs!:any;
  clientorders!:any;
  supplierorders!:any;
  new!:InventoryNode;
  specifictypes:child[] = [];
  account!:Account;
  date!:Date;
  //Search query 
  query:string = '';
  ngOnInit(): void {
    //Inorder to display who generated it 
    this.account = this.ventrixdbservice.getAccount();

    //To display date
    this.date = new Date();

    //Get inventory from api
    this.ventrixdbservice.readInventory()
    .subscribe(response => {
      this.inventories = response;

        
        //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
        this.ventrixdbservice.readInventoryType()
        .subscribe(response => {
          this.types = response;

            this.ventrixdbservice.readInventoryCategory()
            .subscribe(response => {
              this.categories = response;

              this.ventrixdbservice.readWarehouse()
              .subscribe(response => {
                this.warehouses = response;

                this.ventrixdbservice.readSupplier()
                .subscribe(response => {
                  this.suppliers = response;

                  this.inventories.forEach(inventory => {
                  this.type = this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId);

                  //New inventory view model is assigned the retrived values from the api
                  this.item = 
                  {
                    inventoryId: inventory.inventoryId,
                    warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                    type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                    category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                    supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                    name: inventory.name,
                    quantityOnHand: inventory.quantityOnHand,
                    account: this.account.name+' '+this.account.surname
                  }
                  this.inventoryItems.push(this.item)
       
                })

                this.new =
                {
                  name: 'All',
                }
                TREE_DATA.push(this.new)

                  //Add Categories and types to nodes 
                  this.categories.forEach(category => {
                    this.specifictypes = [];
                        this.types.forEach(type => {
                          if(type.inventoryCategoryId == category.inventoryCategoryId)
                          {
                            this.specifictypes.push({name: type.description.toString()});
                          }
                        });
                        this.new = 
                        {
                          name : category.description.toString(),
                          children: this.specifictypes
                        }
                        TREE_DATA.push(this.new)
                    });

                  this.dataSource.data = TREE_DATA;

                  console.log(TREE_DATA)

              })

            })
            
        })

      });
      console.log(this.inventoryItems)
    })
  }

  childClick(selectednode: string)
  {
    this.inventoryItems = [];
    if (selectednode == 'All')
    {
      //Get inventory from api
      this.ventrixdbservice.readInventory()
      .subscribe(response => {
        this.inventories = response;
  
          //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
          this.ventrixdbservice.readInventoryType()
          .subscribe(response => {
            this.types = response;
  
              this.ventrixdbservice.readInventoryCategory()
              .subscribe(response => {
                this.categories = response;
  
                this.ventrixdbservice.readWarehouse()
                .subscribe(response => {
                  this.warehouses = response;
  
                  this.ventrixdbservice.readSupplier()
                  .subscribe(response => {
                    this.suppliers = response;
  
                    this.inventories.forEach(inventory => {
                    this.type = this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId);
                     

                    //New inventory view model is assigned the retrived values from the api
                    this.item = 
                    {
                      inventoryId: inventory.inventoryId,
                      warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                      type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                      category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                      supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                      name: inventory.name,
                      quantityOnHand: inventory.quantityOnHand,
                      account: this.account.name+' '+this.account.surname
                    }
                    this.inventoryItems.push(this.item)
                  })
  
                })
  
              })
              
          })
  
        });
        console.log(this.inventoryItems)
      })
    }
    else
    {
      //Get inventory from api
      this.ventrixdbservice.readInventory()
      .subscribe(response => {
        this.inventories = response;
  
          //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
          this.ventrixdbservice.readInventoryType()
          .subscribe(response => {
            this.types = response;
  
              this.ventrixdbservice.readInventoryCategory()
              .subscribe(response => {
                this.categories = response;
  
                this.ventrixdbservice.readWarehouse()
                .subscribe(response => {
                  this.warehouses = response;
  
                  this.ventrixdbservice.readSupplier()
                  .subscribe(response => {
                    this.suppliers = response;
  
                    this.inventories.forEach(inventory => {
                    this.type = this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId);
                     
                    if (this.types.find(x => x.description == selectednode && x.inventoryTypeId == inventory.inventoryTypeId) != undefined)
                    {
                    //New inventory view model is assigned the retrived values from the api
                    this.item = 
                    {
                      inventoryId: inventory.inventoryId,
                      warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                      type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                      category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                      supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                      name: inventory.name,
                      quantityOnHand: inventory.quantityOnHand,
                      account: this.account.name+' '+this.account.surname
                    }
                    this.inventoryItems.push(this.item)
                   }
                  })
  
                })
  
              })
              
          })
  
        });
        console.log(this.inventoryItems)
      })
    }
   
  }

  generateExcel()
  {
    this.ventrixdbservice.generateExcelInventoryReport(this.inventoryItems).subscribe(res => {
      const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
     saveAs(data,"Inventory List Report");
   });
  }
  
  parentClick(selectednode: string)
  {
    this.inventoryItems = [];
      //Get inventory from api
      this.ventrixdbservice.readInventory()
      .subscribe(response => {
        this.inventories = response;

          //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
          this.ventrixdbservice.readInventoryType()
          .subscribe(response => {
            this.types = response;

              this.ventrixdbservice.readInventoryCategory()
              .subscribe(response => {
                this.categories = response;

                this.ventrixdbservice.readWarehouse()
                .subscribe(response => {
                  this.warehouses = response;

                  this.ventrixdbservice.readSupplier()
                  .subscribe(response => {
                    this.suppliers = response;

                this.inventories.forEach(inventory => {
                this.type = this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId);
                 
                if (this.categories.find(x => x.description == selectednode && x.inventoryCategoryId == this.type.inventoryCategoryId) != undefined)
                {
                //New inventory view model is assigned the retrived values from the api
                this.item = 
                {
                  inventoryId: inventory.inventoryId,
                  warehouse :this.warehouses.find(x => x.warehouseId == inventory.warehouseId),
                  type:this.types.find(x => x.inventoryTypeId == inventory.inventoryTypeId),
                  category :this.categories.find(x => x.inventoryCategoryId == this.type.inventoryCategoryId),
                  supplier:this.suppliers.find(x => x.supplierId == inventory.supplierId),
                  name: inventory.name,
                  quantityOnHand: inventory.quantityOnHand,
                  account: this.account.name+' '+this.account.surname
                }
                this.inventoryItems.push(this.item)
               }
              })

            })

          })
          
      })

    });
    console.log(this.inventoryItems)
  })
  }

  //Data Tree
  private _transformer = (node: InventoryNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  // PDF Options
  openPDF(){
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
      PDF.save('Inventory List Report.pdf');
    }
  
    )
  }

}
