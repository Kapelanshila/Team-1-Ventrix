import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Warehouse } from 'src/app/shared/Warehouse';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.css']
})
export class CreateWarehouseComponent implements OnInit {

  warehouseForm : FormGroup;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.warehouseForm = fbuilder.group({
      Name: new FormControl ('',[Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  
  //Form submit calls add warehouse function
  addWarehouse()
  {
    console.log(this.warehouseForm.value);
    this.ventrixdbservice.createClient(this.warehouseForm.value).subscribe()
        //redirects back to data table and refreshes
        this.router.navigate(['/read-warehouse']).then(() => {
          window.location.reload();
        });
  }


  //When Cancel button clicked returns to Read Client screen
  returnDataTable()
  {
    this.router.navigate(['/read-warehouse']);
  }

}
