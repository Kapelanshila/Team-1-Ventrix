import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryType } from 'src/app/shared/InventoryType';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { InventoryCategory } from 'src/app/shared/InventoryCategory';
import { AssetRepairReason } from 'src/app/shared/AssetRepairReason';

@Component({
  selector: 'app-read-asset-repair-reason',
  templateUrl: './read-asset-repair-reason.component.html',
  styleUrls: ['./read-asset-repair-reason.component.css']
})
export class ReadAssetRepairReasonComponent implements OnInit {
  assetrepairreasons:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  specifictypes:any[] = [];
  assetrepairs!: any;
  //Search query 
  query:string = '';
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { 
    // Copy
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
     // Copy
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readAssetRepairReason()
    .subscribe(response => {
      this.assetrepairreasons = response;
      console.log(this.assetrepairreasons)
    })
  }

  addassetrepairreason()
  {
    this.router.navigate(['/create-assetrepairreason']);
  }

  // Copy
  pageChange(newPage: number) {
		this.router.navigate(['/read-assetrepairreason'], { queryParams: { page: newPage } })
  }
// Copy


  editassetrepairreason(selectedassetrepairreason: AssetRepairReason)
  {
      this.ventrixdbservice.setAssetRepairReason(selectedassetrepairreason);
      this.router.navigate(['/update-assetrepairreason']);
  }

  //Delete inventory category Function 
  deleteassetrepairreason(selectedassetrepairreason: AssetRepairReason)
  {       
    this.ventrixdbservice.readAssetRepair()
    .subscribe(response => {
      this.assetrepairs = response;

      if (this.assetrepairs.find((x: { assetRepairReasonId: Number; }) => x.assetRepairReasonId == selectedassetrepairreason.assetRepairReasonId) == undefined)
      {
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure you want to delete this asset repair reason?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.deleteAssetRepairReason(selectedassetrepairreason).subscribe();
            this.router.navigate(['/read-writeoffreason']).then(() => {
            window.location.reload();
            });
          }
        })  
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Asset Repair Reason Assoiciated to other entries',
            showDenyButton: false,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
      })
  } 
}
