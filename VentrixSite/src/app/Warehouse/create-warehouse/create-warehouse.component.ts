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
  find=false;
  warehouses:any[] = [];
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.warehouseForm = fbuilder.group({
      name: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      address: new FormControl ('',[Validators.required,this.noWhitespaceValidator])
    });
  }

  ngOnInit(): void {
    
    this.ventrixdbservice.readWarehouse()
    .subscribe(response => {
      this.warehouses = response;
      console.log(this.warehouses)
  })
}
  
  //Form submit calls add warehouse function
createWarehouse()
  {
    this.submitted = true;
    //Check if warehouse does not already exsist
    this.warehouses.forEach(element => {
      if (element.name == this.warehouseForm.get('name')?.value 
      && element.address == this.warehouseForm.get('address')?.value) 
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'This warehouse already exists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
              this.router.navigate(['/create-warehouse']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
    });

    if (this.warehouseForm.valid && this.find == false) {
      console.log(this.warehouseForm.value);
      this.ventrixdbservice.createWarehouse(this.warehouseForm.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'The warehouse has been added successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
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

  //Check no white spaces
  public noWhitespaceValidator(someFormControl: FormControl) 
  {
    var iCount = 0;
    for(var i = 0; i < someFormControl.value.length; i++)
    {
      if (someFormControl.value[i] == " ")
      {
        iCount += 1
      }
    }
    if (iCount != someFormControl.value.length)
    {
      return  null
    }
    return {'noWhitespaceValidator' : true}
  }

  // Only AlphaNumeric
  keyPressAlphanumeric(event: { keyCode: number; preventDefault: () => void; }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z0-9 ]+$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // Only Alphabet & space
  keyPressAlphabet(event: { keyCode: number; preventDefault: () => void; }) {
    var inp = String.fromCharCode(event.keyCode);

    if (/^[a-zA-Z ]+$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
