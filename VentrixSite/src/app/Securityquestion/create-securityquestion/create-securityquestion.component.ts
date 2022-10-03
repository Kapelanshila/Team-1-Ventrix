import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Securityquestion } from 'src/app/shared/SecurityQuestion';
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
  find =false;
  securityquestions:any[] = [];
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this. Securityquestionform = fbuilder.group({
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }



  ngOnInit(): void {
    this.ventrixdbservice.readSecurityquestion()
    .subscribe(response => {
      this.securityquestions = response;
    })
  }
  //Form submit calls add security question
  addSecurityquestion()
  {
    this.submitted = true;
    //Check if client does not already exsist
    this.securityquestions.forEach(element => {
      if (element.description == this.Securityquestionform.get('description')?.value) 
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'Security Question Already Exists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
    });

    if (this.Securityquestionform.valid && this.find == false) {
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
