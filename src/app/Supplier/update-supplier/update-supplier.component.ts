import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from 'src/app/shared/Supplier';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {
  supplierform : FormGroup;
  supplier: Supplier|undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.supplierform = fbuilder.group({
      //Supplier ID is not displayed but is neccessary for the API to update
      supplierId: new FormControl ('',[Validators.required]),
      SupplierName: new FormControl ('',[Validators.required]),
      contactPersonSurname: new FormControl ('',[Validators.required,]),
      contactPersonNumber: new FormControl ('',[Validators.required,]),
      workAddress: new FormControl ('',[Validators.required,]),
      emailAddress: new FormControl ('',[Validators.required,]),
    });
  }

  //Populate Input values
  ngOnInit(): void 
  {
    this.supplier = this.ventrixdbservice.getSupplier();
    this.supplierform.patchValue({
    clientId: this.supplier?.supplierId,
    supplierName: this.supplier?.SupplierName,
    contactPersonSurname: this.supplier?.contactPersonName,
    contactPersonNumber: this.supplier?.contactPersonNumber,
    workAddress: this.supplier?.workAddress,
    emailAddress: this.supplier?.emailAddress
    })

    this.ventrixdbservice.clearClient();
  }

  updateSupplier()
    {
      this.ventrixdbservice.updateSupplier(this.supplierform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Supplier Updated Successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/read-supplier']).then(() => {
            window.location.reload();
          });
        }
      })  
    }

    //When Cancel button clicked returns to Read Supplier screen
    returnDataTable()
    {
      this.router.navigate(['/read-supplier']);
    }
}
