import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Warehouse } from 'src/app/shared/Warehouse';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import  Swal  from 'sweetalert2';

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
      Address: new FormControl ('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }
  
  //Form submit calls add warehouse function
  addWarehouse()
  {
    this.submitted = true;
    if (this.warehouseForm.valid) {
    console.log(this.warehouseForm.value);
    this.ventrixdbservice.createWarehouse(this.warehouseForm.value).subscribe()

    Swal.fire({
      icon: 'success',
      title: 'The warehouse has been successfully created and saved.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        //redirects back to data table and refreshes
        this.router.navigate(['/read-warehouse']).then(() => {
          window.location.reload();
        });
      }
    })
  }
  }

   // Get value of formcontrol name to return it to api
   get f() { return this.warehouseForm.controls!; }

  //When Cancel button clicked returns to Read Client screen
  returnDataTable()
  {
    this.router.navigate(['/read-warehouse']);
  }

}
