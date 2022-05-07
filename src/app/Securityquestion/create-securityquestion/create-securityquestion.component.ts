import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Securityquestion } from 'src/app/shared/Securityquestion';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-securityquestion',
  templateUrl: './create-securityquestion.component.html',
  styleUrls: ['./create-securityquestion.component.css']
})
export class CreateSecurityquestionComponent implements OnInit {
  Securityquestionform : FormGroup;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this. Securityquestionform = fbuilder.group({
      Description: new FormControl ('',[Validators.required,]),
    });
  }



  ngOnInit(): void {

  }
  //Form submit calls add security question
  addSecurityquestion()
  {
    this.submitted = true;
    if (this. Securityquestionform.valid) {
      console.log(this.Securityquestionform.value);
      this.ventrixdbservice.createSecurityquestion(this.Securityquestionform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Security Question Added Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-securityquestion']).then(() => {
              window.location.reload();
            });
          }
        })  
    }
  }

  // Get value of formcontrol name to return it to api
  get f() { return this. Securityquestionform.controls!; }

  //When Cancel button clicked returns to Read Security Question screen
  returnDataTable()
  {
    this.router.navigate(['/read-securityquestion']);
  }

}
