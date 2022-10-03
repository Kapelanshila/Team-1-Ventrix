import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { AssetVM } from 'src/app/shared/AssetVM';
//Make sure swal is imported
import Swal from 'sweetalert2';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { AssetType } from 'src/app/shared/AssetType';
import { AssetCategory } from 'src/app/shared/AssetCategory';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Account } from 'src/app/shared/Account';
import { AssetReport } from 'src/app/shared/AssetReport';
import { saveAs } from 'file-saver';

interface AssetNode {
  name: string;
  children?: AssetNode[];
}

interface child {
  name: string;
}

const TREE_DATA: AssetNode[] =[];
const WTREE_DATA: AssetNode[] =[];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-asset-report',
  templateUrl: './asset-report.component.html',
  styleUrls: ['./asset-report.component.css']
})
export class AssetReportComponent implements OnInit {
  specifictypes:child[] = [];
  assets:any[] = [];
  warranties:any[] = [];
  types:AssetType[] = [];
  categories:AssetCategory[] = [];
  p: number = 1;
  warehouse:any;
  new!:AssetNode;
  config: any; 
  noOfRows = 10;
  item!:AssetReport;
  type:any;
  assetItems:any[] = [];
  conditions:any[] = [];
  warrantyperiods:any[] = [];
  warranty!: any;
  warehouses:any[] = [];
  repairs:any[] = [];
  account!:Account;
  date!:Date;
  selectedwarehouse:string = "All";

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

  //Search query 
  query:string = '';
  ngOnInit(): void 
  {
        //Inorder to display who generated it 
        this.account = this.ventrixdbservice.getAccount();

        //To display date
        this.date = new Date();

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

                  this.new =
                  {
                    name: 'All',
                  }
                  TREE_DATA.push(this.new)
                  WTREE_DATA.push(this.new)

                  //Add Categories and types to nodes 
                  this.categories.forEach(category => {
                    this.specifictypes = [];
                        this.types.forEach(type => {
                          if(type.assetCategoryId == category.assetCategoryId)
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

                          this.warehouses.forEach(element => {
                            WTREE_DATA.push(element)
                          });

                          this.wdataSource.data = WTREE_DATA;
                        
                        this.assets.forEach(asset => {
                        if (asset.assetStatus != "Written Off")
                        {
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
                          type: this.types.find(x => x.assetTypeId == this.type.assetTypeId)!.description.toString(),
                          category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId)!.description.toString(),
                          warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                          condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                          warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                          warrantyDate: this.warranty.date,
                          assetImage: asset.assetImage,
                          warrantyPeriodId: this.warranty.warrantyPeriodId,
                          assetCategoryId: this.type.assetCategoryId,
                          assetStatus: asset.assetStatus,
                          value: asset.value,
                          account: this.account.name+' '+this.account.surname,
                          selectedWarehouse: this.selectedwarehouse
                        }
                        this.assetItems.push(this.item)
                      }
                      })
                      
                  })
                })
                })
              })       
            })       
          });
        }
    })
  }

  warehouseclicked(selectednode:string)
  {
    this.selectedwarehouse = selectednode;
    this.assetItems = [];

    if (selectednode == "All")
    {
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

                          if (asset.assetStatus != "Written Off")
                          {
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
                            type: this.types.find(x => x.assetTypeId == this.type.assetTypeId)!.description.toString(),
                            category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId)!.description.toString(),
                            warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                            condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                            warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                            warrantyDate: this.warranty.date,
                            assetImage: asset.assetImage,
                            warrantyPeriodId: this.warranty.warrantyPeriodId,
                            assetCategoryId: this.type.assetCategoryId,
                            assetStatus: asset.assetStatus,
                            value: asset.value,
                            account: this.account.name+' '+this.account.surname,
                            selectedWarehouse: this.selectedwarehouse

                          }
                          this.assetItems.push(this.item)
                        }
                        })
                        
                    })
                  })
                  })
                })       
              })       
            });
          }
      })
    }
    else
    {
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
                       this.warehouse = this.warehouses.find(x => x.warehouseId == asset.warehouseId);

                       if (asset.assetStatus != "Written Off" && selectednode == this.warehouse.name)
                     {
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
                       type: this.types.find(x => x.assetTypeId == this.type.assetTypeId)!.description.toString(),
                       category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId)!.description.toString(),
                       warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                       condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                       warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                       warrantyDate: this.warranty.date,
                       assetImage: asset.assetImage,
                       warrantyPeriodId: this.warranty.warrantyPeriodId,
                       assetCategoryId: this.type.assetCategoryId,
                       assetStatus: asset.assetStatus,
                       value: asset.value,
                       account: this.account.name+' '+this.account.surname,
                       selectedWarehouse: this.selectedwarehouse

                     }
                     this.assetItems.push(this.item)
                   }
                   })
                   
               })
             })
             })
           })       
         })       
       });
     }
 })
    }
   
  }

  generateExcel()
  {
    this.ventrixdbservice.generateExcelAssetReport(this.assetItems).subscribe(res => {
      const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
     saveAs(data,"Asset List Report");
   });
  }

  parentClick(selectednode: string)
  {
    this.assetItems = [];
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

                      if (asset.assetStatus != "Written Off" && this.categories.find(x => x.description == selectednode && x.assetCategoryId == this.type.assetCategoryId) != undefined)
                      {
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
                          type: this.types.find(x => x.assetTypeId == this.type.assetTypeId)!.description.toString(),
                          category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId)!.description.toString(),
                          warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                          condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                          warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                          warrantyDate: this.warranty.date,
                          assetImage: asset.assetImage,
                          warrantyPeriodId: this.warranty.warrantyPeriodId,
                          assetCategoryId: this.type.assetCategoryId,
                          assetStatus: asset.assetStatus,
                          value: asset.value,
                          account: this.account.name+' '+this.account.surname,
                          selectedWarehouse: this.selectedwarehouse

                        }
                        this.assetItems.push(this.item)
                      }
                      })
                      
                  })
                })
                })
              })       
            })       
          });
        }
    })
  }

  download()
  {
    this.ventrixdbservice.generateAssetPDFReport(this.assetItems)
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
     saveAs(data,"Asset Report");
   });
  }
  

  childClick(selectednode: string)
  {
    this.assetItems = [];

    if (selectednode == "All")
    {
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

                          if (asset.assetStatus != "Written Off")
                          {
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
                            type: this.types.find(x => x.assetTypeId == this.type.assetTypeId)!.description.toString(),
                            category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId)!.description.toString(),
                            warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                            condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                            warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                            warrantyDate: this.warranty.date,
                            assetImage: asset.assetImage,
                            warrantyPeriodId: this.warranty.warrantyPeriodId,
                            assetCategoryId: this.type.assetCategoryId,
                            assetStatus: asset.assetStatus,
                            value: asset.value,
                            account: this.account.name+' '+this.account.surname,
                            selectedWarehouse: this.selectedwarehouse

                          }
                          this.assetItems.push(this.item)
                        }
                        })
                        
                    })
                  })
                  })
                })       
              })       
            });
          }
      })
    }
    else
    {
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

                     if (asset.assetStatus != "Written Off" && this.types.find(x => x.description == selectednode && x.assetTypeId == asset.assetTypeId) != undefined)
                     {
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
                       type: this.types.find(x => x.assetTypeId == this.type.assetTypeId)!.description.toString(),
                       category :this.categories.find(x => x.assetCategoryId == this.type.assetCategoryId)!.description.toString(),
                       warrantyperiod: this.warrantyperiods.find(x => x.warrantyPeriodId == this.warranty.warrantyPeriodId).value,
                       condition: this.conditions.find(x => x.conditionId == asset.conditionId).description,
                       warehouse:this.warehouses.find(x => x.warehouseId == asset.warehouseId).name,
                       warrantyDate: this.warranty.date,
                       assetImage: asset.assetImage,
                       warrantyPeriodId: this.warranty.warrantyPeriodId,
                       assetCategoryId: this.type.assetCategoryId,
                       assetStatus: asset.assetStatus,
                       value: asset.value,
                       account: this.account.name+' '+this.account.surname,
                       selectedWarehouse: this.selectedwarehouse

                     }
                     this.assetItems.push(this.item)
                   }
                   })
                   
               })
             })
             })
           })       
         })       
       });
     }
 })
    }
   
  }

  //Data Tree
  private _transformer = (node: AssetNode, level: number) => {
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
  wdataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

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
    PDF.save('Asset List Report.pdf');
  }

  )
}
  }
