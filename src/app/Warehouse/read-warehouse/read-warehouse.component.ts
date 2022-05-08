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
      console.log(this.warehouses)
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
    
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you would like to delete this warehouse?',
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
}
