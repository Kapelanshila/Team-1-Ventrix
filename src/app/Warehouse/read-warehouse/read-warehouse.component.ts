import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Warehouse} from 'src/app/shared/Warehouse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-warehouse',
  templateUrl: './read-warehouse.component.html',
  styleUrls: ['./read-warehouse.component.css']
})
export class ReadWarehouseComponent implements OnInit {
  warehouses:any[] = [];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }


  ngOnInit(): void 
  {
    this.ventrixdbservice.readWarehouse()
    .subscribe(response => {
      this.warehouses = response;
      console.log(this.warehouses)
    })
  }

  addWarehouse()
  {
    this.router.navigate(['/create-warehouse']);
  }

  editWarehouse(selectedWarehouse: Warehouse)
  {
      this.ventrixdbservice.setWarehouse(selectedWarehouse);
      this.router.navigate(['/update-warehouse']);
  }

  //Delete Warehouse Function 
  deleteWarehouse(selectedWarehouse: Warehouse)
  {
    this.ventrixdbservice.deleteWarehouse(selectedWarehouse).subscribe();
    location.reload();
  }

}
