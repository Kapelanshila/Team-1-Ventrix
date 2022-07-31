import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { InventoryVM } from 'src/app/shared/InventoryVM';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryWriteOff } from 'src/app/shared/InventoryWriteOff';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.css']
})
export class WriteOffComponent implements OnInit {
  types:any[] = [];
  categories:any[] = [];
  inventoryform : FormGroup;
  submitted = false;
  inventoryitem:InventoryVM | undefined;
  suppliers:any[] = []; 
  warehouses:any[] = [];
  inventories:any[] = [];
  find = false;
  temp:any[] = [];
  reasons:any[] = [];
  newWriteOff!:InventoryWriteOff;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.inventoryform = fbuilder.group({
      inventoryId: new FormControl (''),
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      quantity: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      writeOffReasonId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }
  ngOnInit(): void {
    this.ventrixdbservice.readInventory()
    .subscribe(response => {
      this.inventories = response;
    })

    this.ventrixdbservice.readWriteOffReason()
    .subscribe(response => {
      this.reasons = response;
    })

    this.ventrixdbservice.readInventoryCategory()
    .subscribe(response => {
      this.temp = response;

      this.temp.forEach(value => {

        this.ventrixdbservice.readInventoryType()
        .subscribe(response => {
            if (response.find(x => x.inventoryCategoryId == value.inventoryCategoryId) != undefined )
            {
              this.categories.push(this.temp.find(x => x.inventoryCategoryId == value.inventoryCategoryId));
            }
        })
      });
    })
    this.ventrixdbservice.readInventoryType()
    .subscribe(response => {
      response.forEach(element => {
        if (element.inventoryCategoryId == this.inventoryform.get('inventoryCategoryId')?.value)
        {
          this.types.push(element);
        }
      });
      console.log(this.types)
    }) 

    this.ventrixdbservice.readSupplier()
    .subscribe(response => {
      this.suppliers = response;
    })

    this.ventrixdbservice.readWarehouse()
    .subscribe(response => {
      this.warehouses = response;
    })


    this.inventoryitem = this.ventrixdbservice.getInventory()
    this.inventoryform.patchValue({
      inventoryId: this.inventoryitem?.inventoryId,
      name: this.inventoryitem?.name,
      supplierId: this.inventoryitem?.supplier?.supplierId,
      warehouseId: this.inventoryitem?.warehouse?.warehouseId,
      inventoryTypeId: this.inventoryitem?.type?.inventoryTypeId,
      inventoryCategoryId: this.inventoryitem?.category?.inventoryCategoryId,
    })

    this.ventrixdbservice.clearInventoryWriteOff();
  }

  get f() {return this.inventoryform.controls!; }

  returnDataTable()
  {
    this.router.navigate(['/write-off-inventory']);
  }

    writeOffInventory()
    {
      this.submitted = true
      if (this.inventoryform.valid)
      {
        if (this.inventoryform.get('quantity')?.value > this.inventoryitem?.quantityOnHand! || this.inventoryform.get('quantity')?.value == 0)
        {
          Swal.fire({
            icon: 'warning',
            title: 'Invalid Quantity Value',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else
        {
          this.newWriteOff =
          {
            inventoryWriteOffLineId: 0,
            inventoryWriteOffId: 0,
            inventoryId: this.inventoryitem?.inventoryId!,
            writeOffReasonId: this.inventoryform.get('writeOffReasonId')?.value,
            description: this.inventoryform.get('description')?.value,
            quantity: this.inventoryform.get('quantity')?.value,
          }

          Swal.fire({
            icon: 'success',
            title: 'Inventory Successfully Written Off',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.ventrixdbservice.createWriteOff(this.newWriteOff).subscribe()
              this.router.navigate(['/write-off-inventory']).then(() => {
                window.location.reload();
              });
            }
          })   
        }
      }
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
