import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryCategory } from 'src/app/shared/InventoryCategory';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-inventorycategory',
  templateUrl: './create-inventorycategory.component.html',
  styleUrls: ['./create-inventorycategory.component.css']
})
export class CreateInventorycategoryComponent implements OnInit {
  inventorycategoryform : FormGroup;
  submitted = false;
  find = false;
  inventorycategories:any[] = [];
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
        this.inventorycategoryform = fbuilder.group({
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator])
    });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readInventoryCategory()
    .subscribe(response => {
      this.inventorycategories = response;
      console.log(this.inventorycategories)
    })
  }
  //Form submit calls add inventory category function
  addInventoryCategory()
  {
    this.submitted = true;
    //Check if inventory category does not already exsist
    this.inventorycategories.forEach(element => {
      if (element.description == this.inventorycategoryform.get('description')?.value) 
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'Inventory Category Already Exsists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
              this.router.navigate(['/create-inventorycategory']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
    });

    if (this.inventorycategoryform.valid && this.find == false) {
      console.log(this.inventorycategoryform.value);
      this.ventrixdbservice.createInventoryCategory(this.inventorycategoryform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Inventory Category Added Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-inventorycategory']).then(() => {
              window.location.reload();
            });
          }
        })  
    }
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.inventorycategoryform.controls!; }

  //When Cancel button clicked returns to Read inventory category screen
  returnDataTable()
  {
    this.router.navigate(['/read-inventorycategory']);
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
