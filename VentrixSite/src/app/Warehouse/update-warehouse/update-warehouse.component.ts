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
  warehouses: any[] = [];
  find = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.warehouseForm = fbuilder.group({
      //Warehouse ID is not displayed but is neccessary for the API to update
      warehouseId: new FormControl (''),
      name: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      address: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }
 //Populate Input values
    ngOnInit(): void 
    {
    
      this.warehouse = this.ventrixdbservice.getWarehouse();
      this.warehouseForm.patchValue({
      warehouseId: this.warehouse?.warehouseId,
      name: this.warehouse?.name,
      address: this.warehouse?.address,
      })

      this.ventrixdbservice.clearWarehouse();

      this.ventrixdbservice.readWarehouse()
      .subscribe(response => {
        this.warehouses = response;
        console.log(this.warehouses)
      })
      console.log(this.warehouseForm.value)
    }
    

        // Get value of formcontrol name to return it to api
        get f() { return this.warehouseForm.controls!; }

    updateWarehouse()
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
              this.router.navigate(['/read-warehouse']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
    });

    if (this.warehouseForm.valid && this.find == false) 
    { 
      console.log(this.warehouseForm.value)

      this.ventrixdbservice.updateWarehouse(this.warehouseForm.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'The warehouse has been updated successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      .then((result) => {
       if (result.isConfirmed) {
       this.router.navigate(['/read-warehouse']).then(() => {
        window.location.reload();
        });
       }
      })   
    }
  }

    //When Cancel button clicked returns to Read Warehouse screen
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
}
