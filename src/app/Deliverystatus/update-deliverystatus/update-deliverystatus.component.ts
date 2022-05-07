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
  submitted = false;

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService) { 
    //Additional Validation can be added here
    this.Deliverystatusform = fbuilder.group({
      // Delivery status ID is not displayed but is neccessary for the API to update
      deliveryStatusId: new FormControl ('',[Validators.required]),
      description: new FormControl ('',[Validators.required,]),
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

      this.ventrixdbservice.clearDeliverystatus();
    }

    updateDeliverystatus()
    {
      this.ventrixdbservice.updateDeliverystatus(this.Deliverystatusform.value).subscribe();
      //redirects back to data table and refreshes page
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

    //When Cancel button clicked returns to Read Delivery Status screen
    returnDataTable()
    {
      this.router.navigate(['/read-deliverystatus']);
    }
}
