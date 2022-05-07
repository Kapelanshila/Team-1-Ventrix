import { Component, OnInit } from '@angular/core';
import { Warehouse } from './../../shared/Warehouse';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css']
})

export class UpdateWarehouseComponent implements OnInit {
  warehouseForm : FormGroup;
  warehouse: Warehouse|undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.warehouseForm = fbuilder.group({
      //Warehouse ID is not displayed but is neccessary for the API to update
      WarehouseID: new FormControl ('',[Validators.required]),
      Name: new FormControl ('',[Validators.required]),
      Address: new FormControl ('',[Validators.required,]),
    });
  }
 //Populate Input values
    ngOnInit(): void 
    {
      this.warehouse = this.ventrixdbservice.getWarehouse();
      this.warehouseForm.patchValue({
      WarehouseId: this.warehouse?.WarehouseId,
      Name: this.warehouse?.Name,
      Address: this.warehouse?.Address,
      })

      this.ventrixdbservice.clearWarehouse();
    }

    updateWarehouse()
    {
      this.ventrixdbservice.updateWarehouse(this.warehouseForm.value).subscribe();
      
      Swal.fire({
        icon: 'success',
        title: 'The warehouse has been successfully updated',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
      //redirects back to data table and refreshes page
      this.router.navigate(['/read-warehouse']).then(() => {
        window.location.reload();
      });
    }
  })  
}

    //When Cancel button clicked returns to Read Warehouse screen
    returnDataTable()
    {
      this.router.navigate(['/read-warehouse']);
    }
    }
