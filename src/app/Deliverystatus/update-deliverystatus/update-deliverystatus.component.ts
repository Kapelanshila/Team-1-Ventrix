import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deliverystatus } from 'src/app/shared/Deliverystatus';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-deliverystatus',
  templateUrl: './update-deliverystatus.component.html',
  styleUrls: ['./update-deliverystatus.component.css']
})
export class UpdateDeliverystatusComponent implements OnInit {
  Deliverystatusform : FormGroup;
  Deliverystatus: Deliverystatus|undefined;
  find =false;
  deliverystatuses:any[] = [];
  submitted = false;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService) { 
    //Additional Validation can be added here
    this.Deliverystatusform = fbuilder.group({
      // Delivery status ID is not displayed but is neccessary for the API to update
      deliveryStatusId: new FormControl ('',[Validators.required]),
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

    //Populate Input values
    ngOnInit(): void 
    {
      this.Deliverystatus = this.ventrixdbservice.getDeliverystatus();
      console.log(this.ventrixdbservice.getDeliverystatus())
      this.Deliverystatusform.patchValue({
      deliveryStatusId: this.Deliverystatus?.deliveryStatusId,
      description: this.Deliverystatus?.description,
      })

      this.ventrixdbservice.readDeliverystatus()
      .subscribe(response => {
        this.deliverystatuses = response;
      })
      this.ventrixdbservice.clearDeliverystatus();
    }

    // Get value of formcontrol name to return it to api
    get f() { return this. Deliverystatusform.controls!; }


    updateDeliverystatus()
    {
      this.submitted = true;
    //Check if client does not already exsist
    this.deliverystatuses.forEach(element => {
      if (element.description == this.Deliverystatusform.get('description')?.value) 
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'Delivery Status Altready Exsists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
              this.router.navigate(['/read-deliverystatus']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
    });

    if (this.Deliverystatusform.valid && this.find == false) {
      console.log(this.Deliverystatusform.value);
      this.ventrixdbservice.updateDeliverystatus(this.Deliverystatusform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Delivery Status Updated Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-deliverystatus']).then(() => {
              window.location.reload();
            });
          }
        })  
    }

    }

    //When Cancel button clicked returns to Read Delivery Status screen
    returnDataTable()
    {
      this.router.navigate(['/read-deliverystatus']);
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

}
