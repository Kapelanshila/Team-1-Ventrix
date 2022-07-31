import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WriteOffReason } from 'src/app/shared/WriteOffReason';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-writeoffreason',
  templateUrl: './create-writeoffreason.component.html',
  styleUrls: ['./create-writeoffreason.component.css']
})
export class CreateWriteoffreasonComponent implements OnInit {
  writeoffreasonform : FormGroup;
  submitted = false;
  find = false;
  writeoffreasons:any[] = [];
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.writeoffreasonform = fbuilder.group({
        description: new FormControl ('',[Validators.required,this.noWhitespaceValidator])
    });
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readWriteOffReason()
    .subscribe(response => {
      this.writeoffreasons = response;
      console.log(this.writeoffreasons)
    })
  }
  //Form submit calls add write-off reason function
  addWriteOffReason()
  {
    this.submitted = true;
    //Check if write-off reason does not already exsist
    this.writeoffreasons.forEach(element => {
      if (element.description == this.writeoffreasonform.get('description')?.value) 
      {
        this.find = true;
        Swal.fire({
          icon: 'error',
          title: 'Write-Off Reason Already Exists',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
              this.router.navigate(['/create-writeoffreason']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
    });

    if (this.writeoffreasonform.valid && this.find == false) {
      console.log(this.writeoffreasonform.value);
      this.ventrixdbservice.createWriteOffReason(this.writeoffreasonform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Write-Off Reason Added Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/read-writeoffreason']).then(() => {
              window.location.reload();
            });
          }
        })  
    }
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.writeoffreasonform.controls!; }

  //When Cancel button clicked returns to Read write-off reason screen
  returnDataTable()
  {
    this.router.navigate(['/read-writeoffreason']);
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
