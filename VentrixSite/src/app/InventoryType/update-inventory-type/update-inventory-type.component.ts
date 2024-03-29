import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryType } from 'src/app/shared/InventoryType';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InventoryCategory } from 'src/app/shared/InventoryCategory';


@Component({
  selector: 'app-update-inventory-type',
  templateUrl: './update-inventory-type.component.html',
  styleUrls: ['./update-inventory-type.component.css']
})
export class UpdateInventoryTypeComponent implements OnInit {
  inventorytypeform : FormGroup;
  submitted = false;
  find = false;
  inventorytypes:any[] = [];
  addType:InventoryType|undefined;
  inventorycategory:InventoryCategory|undefined;
  type:InventoryType|undefined;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
        this.inventorytypeform = fbuilder.group({
        inventoryTypeId: new FormControl (''),
        inventoryCategoryId: new FormControl ('',[Validators.required]),
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator])
    });
  }

  ngOnInit(): void 
  {
    
    this.type = this.ventrixdbservice.getInventoryType();
    this.inventorytypeform.patchValue({
    inventoryTypeId: this.type?.inventoryTypeId,
    inventoryCategoryId: this.type?.inventoryCategoryId,
    description: this.type?.description
    })


    this.ventrixdbservice.readInventoryType()
    .subscribe(response => {
      this.inventorytypes = response;
    })
  }
  //Form submit calls add inventory category function
  updateInventoryType()
  {
    this.submitted = true;
    //Check if inventory category does not already exsist
    this.inventorytypes.forEach(element => {
    if (element.description == this.inventorytypeform.get('description')?.value && element.inventoryTypeId != this.type?.inventoryTypeId)
    {
      this.find = true;
      Swal.fire({
        icon: 'error',
        title: 'Inventory Type Altready Exsists',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
            this.router.navigate(['/read-inventorytype']).then(() => {
            window.location.reload();
          });
        }
      })  
    }
  });

    if (this.inventorytypeform.valid && this.find == false) 
    { 
      console.log(this.inventorytypeform.value)
      this.ventrixdbservice.updateInventoryType(this.inventorytypeform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Inventory Type Updated Successfully',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/read-inventorytype']).then(() => {
            window.location.reload();
          });
        }
      })   
    }
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.inventorytypeform.controls!; }

  //When Cancel button clicked returns to Read inventory category screen
  returnDataTable()
  {
    this.router.navigate(['/read-inventorytype']);
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