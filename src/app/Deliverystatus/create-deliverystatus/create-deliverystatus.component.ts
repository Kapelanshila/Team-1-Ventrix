import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deliverystatus } from 'src/app/shared/Deliverystatus';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-deliverystatus',
  templateUrl: './create-deliverystatus.component.html',
  styleUrls: ['./create-deliverystatus.component.css']
})
export class CreateDeliverystatusComponent implements OnInit {
  Deliverystatusform : FormGroup;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService) { 
    
      //Additional Validation can be added here
      this. Deliverystatusform = fbuilder.group({
        Description: new FormControl ('',[Validators.required,]),
      });
  }

 

  ngOnInit(): void {
  }
  //Form submit calls add delivery status
  addDeliverystatus()
  {
    this.submitted = true;
    if (this. Deliverystatusform.valid) {
      console.log(this. Deliverystatusform.value);
      this.ventrixdbservice.createDeliverystatus(this. Deliverystatusform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Delivery Status Added Successfully',
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

  // Get value of formcontrol name to return it to api
  get f() { return this. Deliverystatusform.controls!; }

  //When Cancel button clicked returns to Read Delivery Status screen
  returnDataTable()
  {
    this.router.navigate(['/read-deliverystatus']);
  }

}
