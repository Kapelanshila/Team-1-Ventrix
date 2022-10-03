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
import { AssetRepair } from 'src/app/shared/AssetRepair';
import { DeleteAssetRepairVM } from 'src/app/shared/DeleteAssetRepairVM';

@Component({
  selector: 'app-revert-repair',
  templateUrl: './revert-repair.component.html',
  styleUrls: ['./revert-repair.component.css']
})
export class RevertRepairComponent implements OnInit {

  repairs:any[] = [];
  reasons:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  item!:AssetRepair;
  type:any;
  assets:any[] = [];
  repairItems:AssetRepair[] = [];
  itemSelected!: AssetRepair;
  deleteAsset!:DeleteAssetRepairVM;
  assetrepair!:DeleteAssetRepairVM;

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

    //Modal
  displayStyle = "none";
  
  //Modal Open and Close Functions
  openPopup(repairItem: AssetRepair) {
    this.itemSelected = repairItem;
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
    
  //Search query 
  query:string = '';
  ngOnInit(): void 
  {
    this.ventrixdbservice.clearAssetRepair();
    //Get asset from api
    this.ventrixdbservice.readAssetRepair()
    .subscribe(response => {
      this.repairs = response;

        //In the event there no assets
        if (this.repairs.length != 0)
        {
            //Types,Category,Supplier and Warehouse is also retrived from the api in order to present relevant information realting to that inventory item
            this.ventrixdbservice.readAsset()
            .subscribe(response => {
              this.assets = response;

                this.ventrixdbservice.readAssetRepairReason()
                .subscribe(response => {
                  this.reasons = response;

                    this.repairs.forEach(element => {
                      if(element.assetRepaired == true)
                      {
                      //New asset view model is assigned the retrived values from the api
                      this.item = 
                      {
                        assetRepairId :element.assetRepairId,
                        assetId :element.assetId, 
                        assetRepairReasonId : element.assetRepairReasonId, 
                        assetRepaired:element.assetRepaired,
                        date: element.date,
                        reason:this.reasons.find(x => x.assetRepairReasonId == element.assetRepairReasonId).description,
                        description: element.description,
                        assetname: this.assets.find(x => x.assetId == element.assetId).name
                      }
                      this.repairItems.push(this.item)   
                      }
                    });
              
                  })
          });
        }
    })
  }
  

  undoRepair(selectedRepair: AssetRepair)
  {
    Swal.fire({
      icon: 'question',
      title: 'Are you want to remove this repair?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Repair Removed Successfully',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.assetrepair = 
            {
              assetRepairId :selectedRepair.assetRepairId,
              assetId :selectedRepair.assetId, 
              assetRepairReasonId : selectedRepair.assetRepairReasonId, 
              assetRepaired:selectedRepair.assetRepaired,
              date: selectedRepair.date,
              reason:selectedRepair.reason,
              description: selectedRepair.description,
              assetname: selectedRepair.assetname,
              userId:this.ventrixdbservice.getAccount().userId
            }
            this.ventrixdbservice.undoRepair(this.assetrepair).subscribe();
            this.router.navigate(['/revert-repair']).then(() => {
            window.location.reload();
            });
          }
        })  
      }
    })  
  }
  }
