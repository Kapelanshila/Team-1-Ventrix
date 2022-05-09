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
  find =false;
  deliverystatuses:any[] = [];

  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService) { 
    
      //Additional Validation can be added here
      this. Deliverystatusform = fbuilder.group({
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
      });
  }

 

  ngOnInit(): void 
  {
    this.ventrixdbservice.readDeliverystatus()
    .subscribe(response => {
      this.deliverystatuses = response;
    })
  }

  //Form submit calls add delivery status
  addDeliverystatus()
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
              this.router.navigate(['/create-deliverystatus']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
    });

    if (this.Deliverystatusform.valid && this.find == false) {
      console.log(this.Deliverystatusform.value);
      this.ventrixdbservice.createDeliverystatus(this.Deliverystatusform.value).subscribe()
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
