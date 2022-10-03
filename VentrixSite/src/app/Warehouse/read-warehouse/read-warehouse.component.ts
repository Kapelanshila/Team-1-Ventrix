import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Warehouse} from 'src/app/shared/Warehouse';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-warehouse',
  templateUrl: './read-warehouse.component.html',
  styleUrls: ['./read-warehouse.component.css']
})
export class ReadWarehouseComponent implements OnInit {
  warehouses:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  inventories: any[] = [];
  assets: any[] = [];

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
   }


  ngOnInit(): void 
  {
    this.ventrixdbservice.readWarehouse()
    .subscribe(response => {
      this.warehouses = response;
    })
  }

  createWarehouse()
  {
    this.router.navigate(['/create-warehouse']);
  }

  pageChange(newPage: number) {
		this.router.navigate(['/read-warehouse'], { queryParams: { page: newPage } })
  }

  editWarehouse(selectedWarehouse: Warehouse)
  {
      this.ventrixdbservice.setWarehouse(selectedWarehouse);
      this.router.navigate(['/update-warehouse']);
  }

  //Delete Warehouse Function 
  deleteWarehouse(selectedWarehouse: Warehouse)
  {
this.ventrixdbservice.readInventory().subscribe(response => {
  this.inventories = response;

  this.ventrixdbservice.readAsset().subscribe(response => {
    this.assets = response;

  if (this.assets.find((x: { warehouseId: Number; }) => x.warehouseId == selectedWarehouse.warehouseId) == undefined && this.inventories.find((x: { warehouseId: Number; }) => x.warehouseId == selectedWarehouse.warehouseId) == undefined)
  {
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this warehouse?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteWarehouse(selectedWarehouse).subscribe();
          this.router.navigate(['/read-warehouse']).then(() => {
            window.location.reload();
          });
        }
      })  
      }
      else
      {
        Swal.fire({
          icon: 'warning',
          title: 'Warehouse Associated to other entries',
          text: 'Warehouse associated to inventory items or asset items',
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
