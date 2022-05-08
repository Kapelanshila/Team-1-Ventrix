import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from 'src/app/shared/Supplier';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {
  supplierform : FormGroup;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.supplierform = fbuilder.group({
      SupplierName: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      contactPersonName: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      contactPersonNumber: new FormControl ('',[Validators.required,this.noWhitespaceValidator,Validators.pattern("[0-9]{10}")]),
      workAddress: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      emailAddress: new FormControl ('',[Validators.required,Validators.email,this.noWhitespaceValidator]),
    });
  }

  ngOnInit(): void {
  }

  //Form submit calls add supplier function
  addSupplier()
  {
    this.submitted = true;
    if (this.supplierform.valid) {
      console.log(this.supplierform.value);
      this.ventrixdbservice.createSupplier(this.supplierform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Supplier Added Successfully',
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
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.supplierform.controls!; }

  //When Cancel button clicked returns to Read Suppliers screen
  returnDataTable()
  {
    this.router.navigate(['/read-supplier']);
  }

  public noWhitespaceValidator(control: FormControl) {
    var iCount = 0;
    for(var i = 0; i < control.value.length; i++)
    {
      if (control.value[i] == " ")
      {
        iCount += 1
      }
    }
    if (iCount != control.value.length)
    {
      return  null
    }
    return {'noWhitespaceValidator' : true}
  }
}
