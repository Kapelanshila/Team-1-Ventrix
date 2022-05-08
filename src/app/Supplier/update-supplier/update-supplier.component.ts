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
  suppliers:any[] = [];
  find = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.supplierform = fbuilder.group({
      //Supplier ID is not displayed but is neccessary for the API to update
      supplierId: new FormControl ('',[Validators.required]),
      SupplierName: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      contactPersonSurname: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      contactPersonNumber: new FormControl ('',[Validators.required,this.noWhitespaceValidator,Validators.pattern("[0-9]{10}")]),
      workAddress: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      emailAddress: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
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

    this.ventrixdbservice.readSupplier().subscribe(response => {
      this.suppliers = response;
      console.log(this.suppliers)
    })
  }

  get f() { return this.supplierform.controls!;}

  updateSupplier()
    {
      this.submitted = true;
      //Check if supplier does not already exist
    this.suppliers.forEach(element => {
      if (element.supplierName == this.supplierform.get('supplierName')?.value
      && element.contactPersonSurname == this.supplierform.get('contactPersonSurname')?.value
      && element.contactPersonNumber == this.supplierform.get('ContactPersonNumber')?.value
      && element.workAddress == this.supplierform.get('workAddress')?.value
      && element.emailAddress == this.supplierform.get('emailAddress')?.value)
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'Supplier Already Exists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/create-supplier']).then(() => {
              window.location.reload();
            })
          }
        })
      }
    });

      if (this.supplierform.valid)
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
    }

    //When Cancel button clicked returns to Read Supplier screen
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
