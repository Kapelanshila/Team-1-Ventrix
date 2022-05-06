import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Depreciation } from 'src/app/shared/Depreciation';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depreciation',
  templateUrl: './depreciation.component.html',
  styleUrls: ['./depreciation.component.css']
})
export class DepreciationComponent implements OnInit {
  depreciationform : FormGroup;
  depreciations:Depreciation | undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.depreciationform = fbuilder.group({
      DepreciationId: new FormControl (''),
      Percentage: new FormControl ('',[Validators.required]),
      DateTime: new FormControl (''),
    });
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.depreciationform.controls!; }

  ngOnInit(): void {

    this.ventrixdbservice.readDepreciation()
    .subscribe(response => {
      this.depreciations = response;
      console.log(this.depreciations)
    })

    if (this.depreciations != undefined)
    {
      this.depreciationform.patchValue({
      DepreciationId: this.depreciations?.DepreciationId,
      Percentage : this.depreciations?.Percentage,
      DateTime: this.depreciations?.DateTime 
      })  
    }
  }


  createDepreciation()
  {
    this.submitted = true;
    if (this.depreciationform.valid) {
      console.log(this.depreciationform.value);
      this.ventrixdbservice.createDepreciation(this.depreciationform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Depreciation Added Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/depreciation']).then(() => {
              window.location.reload();
            });
          }
        })  
    }
  }

  
  updateDepreciation()
  {
    this.submitted = true;
    if (this.depreciationform.valid) {
      console.log(this.depreciationform.value);
      this.ventrixdbservice.updateDepreciation(this.depreciationform.value).subscribe()
        //redirects back to data table and refreshes
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'success',
          title: 'Depreciation Added Successfully',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/depreciation']).then(() => {
              window.location.reload();
            });
          }
        })  
    }
  }

  deleteDepreciation()
  {
    //Sweet alerts are used as notifications
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete depreciation?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventrixdbservice.deleteDepreciation(this.depreciationform.value).subscribe();
        this.router.navigate(['/depreciation']).then(() => {
        window.location.reload();
        });
      }
    })  
  }
}