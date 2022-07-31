import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryCategory } from 'src/app/shared/InventoryCategory';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-inventorycategory',
  templateUrl: './update-inventorycategory.component.html',
  styleUrls: ['./update-inventorycategory.component.css']
})
export class UpdateInventorycategoryComponent implements OnInit {
  inventorycategoryform : FormGroup;
  inventorycategory: InventoryCategory|undefined;
  submitted = false;
  inventorycategories:any[] = [];
  find = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.inventorycategoryform = fbuilder.group({
      //Client ID is not displayed but is neccessary for the API to update
      inventoryCategoryId: new FormControl ('',[Validators.required]),
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

  ngOnInit(): void 
  {
      this.inventorycategory = this.ventrixdbservice.getInventoryCategory();
      this.inventorycategoryform.patchValue({
      inventoryCategoryId: this.inventorycategory?.inventoryCategoryId,
      description: this.inventorycategory?.description
      })      
      this.ventrixdbservice.clearInventoryCategory();
     
      this.ventrixdbservice.readInventoryCategory()
      .subscribe(response => {
        this.inventorycategories = response;
        console.log(this.inventorycategories)
      })
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.inventorycategoryform.controls!; }

  updateInventoryCategory()
  {
    this.submitted = true;
    //Check if inventory category does not already exsist
    this.inventorycategories.forEach(element => {
    if (element.description == this.inventorycategoryform.get('description')?.value && element.inventoryCategoryId != this.inventorycategory?.inventoryCategoryId)
    {
      this.find = true;
      Swal.fire({
        icon: 'error',
        title: 'Inventory Category Altready Exsists',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      }
    });

    if (this.inventorycategoryform.valid && this.find == false) 
    { 
      this.ventrixdbservice.updateInventoryCategory(this.inventorycategoryform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Inventory Category Updated Successfully',
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
