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



@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.css']
})
export class CreateInventoryComponent implements OnInit {
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

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.inventoryform = fbuilder.group({
      inventoryId: new FormControl (0),
      name: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      supplierId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      warehouseId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      inventoryTypeId: new FormControl (' ',[Validators.required,this.noWhitespaceValidator]),
      inventoryCategoryId: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }
  ngOnInit(): void {
    this.ventrixdbservice.readInventory()
    .subscribe(response => {
      this.inventories = response;
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

  }

  get f() {return this.inventoryform.controls!; }

  returnDataTable()
  {
    this.router.navigate(['/read-inventory']);
  }

  addInventory()
    {
      this.submitted = true;
      this.find = false;
    //Check if inventory item does not already exsist
    this.inventories.forEach(element => {
      if (
      element.name == this.inventoryform.get('name')?.value)
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'Inventory Item Altready Exsists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }) 
      }
    });

      if (this.inventoryform.valid && this.find == false) 
      { 
        console.log(this.inventoryform.value)
        this.ventrixdbservice.createInventory(this.inventoryform.value).subscribe();
        //redirects back to data table and refreshes page
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Inventory Item Created Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-inventory']).then(() => {
              window.location.reload();
            });
          }
        })   
      }
    }

    getTypes()
    {
      this.inventoryform.patchValue({
        inventoryTypeId: ''
      })

      if (this.inventoryform.get('inventoryCategoryId')?.value.length != 0 )
      {
        this.types = [];
        console.log(this.types)
        this.ventrixdbservice.readInventoryType()
        .subscribe(response => {
          response.forEach(element => {
            if (element.inventoryCategoryId == this.inventoryform.get('inventoryCategoryId')?.value)
            {
              this.types.push(element);
            }
          });
        })    
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
