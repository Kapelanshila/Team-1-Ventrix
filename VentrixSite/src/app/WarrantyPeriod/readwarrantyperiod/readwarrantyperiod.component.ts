import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WarrantyPeriod} from 'src/app/shared/WarrantyPeriod';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-readwarrantyperiod',
  templateUrl: './readwarrantyperiod.component.html',
  styleUrls: ['./readwarrantyperiod.component.css']
})
export class ReadwarrantyperiodComponent implements OnInit {
  warrantyPeriods:any[] = [];
  warranty!:any;
  assets:any[] = [];
  warranties:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
  }


  ngOnInit(): void 
  {
    this.ventrixdbservice.readWarrantyPeriod()
    .subscribe(response => {
      this.warrantyPeriods = response;
      console.log(this.warrantyPeriods)
    })
  }

  createWarrantyPeriod()
  {
    this.router.navigate(['/create-warranty-period']);
  }

  pageChange(newPage: number) {
		this.router.navigate(['/read-warranty-period'], { queryParams: { page: newPage } })
  }


  editWarrantyPeriod(selectedWarrantyPeriod: WarrantyPeriod)
  {
      this.ventrixdbservice.setWarrantyPeriod(selectedWarrantyPeriod);
      this.router.navigate(['/update-warranty-period']);
  }

  //Delete WarrantyPeriod 
  deleteWarrantyPeriod(selectedWarrantyPeriod: WarrantyPeriod)
  {
this.ventrixdbservice.readAsset().subscribe(response => {
  this.assets = response;

  this.ventrixdbservice.readWarranty().subscribe(response => {
    this.warranties = response;

    this.warranty = this.warranties.find(x => x.warrantyPeriodId == selectedWarrantyPeriod.warrantyPeriodId);

  if (this.warranty == undefined)
  {
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you would like to delete this warranty period?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteWarrantyPeriod(selectedWarrantyPeriod).subscribe();
          this.router.navigate(['/read-warranty-period']).then(() => {
          window.location.reload();
          });
        }
      })  
      }
      else
      {
        Swal.fire({
          icon: 'warning',
          title: 'Warranty Period Associated to other entries',
          text: 'Warranty Period associated to asset items',
          showDenyButton: false,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
    })
  })
}
}
