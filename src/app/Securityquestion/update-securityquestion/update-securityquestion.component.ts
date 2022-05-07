import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Securityquestion } from 'src/app/shared/Securityquestion';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-securityquestion',
  templateUrl: './update-securityquestion.component.html',
  styleUrls: ['./update-securityquestion.component.css']
})
export class UpdateSecurityquestionComponent implements OnInit {
  Securityquestionform : FormGroup;
  Securityquestion: Securityquestion|undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService) { 
    //Additional Validation can be added here
    this.Securityquestionform = fbuilder.group({
      //Security question ID is not displayed but is neccessary for the API to update
      securityQuestionId: new FormControl ('',[Validators.required]),
      description: new FormControl ('',[Validators.required,]),
    });
  }

    //Populate Input values
    ngOnInit(): void 
    {
      console.log(this.ventrixdbservice.getSecurityquestion())
      this.Securityquestion = this.ventrixdbservice.getSecurityquestion();
      this.Securityquestionform.patchValue({
      securityQuestionId: this.Securityquestion?.securityQuestionId,
      description: this.Securityquestion?.description,
      })

      this.ventrixdbservice.clearSecurityquestion();
    }

    updateSecurityquestion()
    {
      this.ventrixdbservice.updateSecurityquestion(this.Securityquestionform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Security Question Updated Successfully',
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

    //When Cancel button clicked returns to Read Security question screen
    returnDataTable()
    {
      this.router.navigate(['/read-securityquestion']);
    }
}
