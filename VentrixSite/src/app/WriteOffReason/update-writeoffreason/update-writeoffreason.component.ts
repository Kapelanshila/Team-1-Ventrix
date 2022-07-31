import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WriteOffReason } from 'src/app/shared/WriteOffReason';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-writeoffreason',
  templateUrl: './update-writeoffreason.component.html',
  styleUrls: ['./update-writeoffreason.component.css']
})
export class UpdateWriteoffreasonComponent implements OnInit {
  writeoffreasonform : FormGroup;
  writeoffreason: WriteOffReason|undefined;
  submitted = false;
  writeoffreasons:any[] = [];
  find = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.writeoffreasonform = fbuilder.group({
      //Write-Off Reason ID is not displayed but is neccessary for the API to update
      WriteOffReasonId: new FormControl ('',[Validators.required]),
      description: new FormControl ('',[Validators.required,this.noWhitespaceValidator]),
    });
  }

  //Populate Input values
  ngOnInit(): void 
  {
    this.writeoffreason = this.ventrixdbservice.getWriteReason();
    this.writeoffreasonform.patchValue({
      WriteOffReasonId: this.writeoffreason?.writeOffReasonId,
    description: this.writeoffreason?.description,
    })

    this.ventrixdbservice.clearWriteOffReason();

    this.ventrixdbservice.readWriteOffReason()
    .subscribe(response => {
      this.writeoffreasons = response;
      console.log(this.writeoffreasons)
    })
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.writeoffreasonform.controls!; }

  updateWriteOffReason()
  {
    this.submitted = true;
    //Check if write-off reason does not already exsist
  this.writeoffreasons.forEach(element => {
    if (element.description == this.writeoffreasonform.get('description')?.value
    && element.writeOffReasonId != this.writeoffreason?.writeOffReasonId) 
    {
      this.find = true;
      Swal.fire({
        icon: 'error',
        title: 'Write-Off Reason Already Exists',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
  });

    if (this.writeoffreasonform.valid && this.find == false) 
    { 
      this.ventrixdbservice.updateWriteReason(this.writeoffreasonform.value).subscribe();
      //redirects back to data table and refreshes page
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'success',
        title: 'Write-Off Reason Updated Successfully',
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

  //When Cancel button clicked returns to Read Write-Off Reason screen
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
