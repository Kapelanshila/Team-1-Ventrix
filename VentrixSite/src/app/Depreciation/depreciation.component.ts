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
  depreciations:any[] = [];
  newDepreciation!:Depreciation;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.depreciationform = fbuilder.group({
      depreciationId: new FormControl (''),
      percentage: new FormControl ('',[Validators.required]),
      date: new FormControl (''),
    });
  }

  // Get value of formcontrol name to return it to api
  get f() { return this.depreciationform.controls!; }

  ngOnInit(): void {

    this.ventrixdbservice.readDepreciation()
    .subscribe(response => {
       this.depreciations = response
    })
  }

  createDepreciation()
  {
    this.submitted =true
    if (this.depreciationform.get('percentage')?.value < 0)
    {
      Swal.fire({
        icon: 'error',
        title: 'Depreciation cannot be negative',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else{
      this.newDepreciation = 
      {
        depreciationId: 0,
        percentage: this.depreciationform.get('percentage')?.value,
        date: new Date(0)
      }
      if (this.depreciationform.valid) {
        this.ventrixdbservice.createDepreciation(this.newDepreciation).subscribe()
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
  }

  
  updateDepreciation(selectedDepreciation: Depreciation)
  {
    this.submitted =true
    if (this.depreciationform.get('percentage')?.value < 0)
    {
      Swal.fire({
        icon: 'error',
        title: 'Depreciation cannot be negative',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }
    else{
    if (this.depreciationform.valid) {
      if (selectedDepreciation.percentage == this.depreciationform.get('percentage')?.value)
      {
        Swal.fire({
          icon: 'info',
          title: 'No changes made',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
      else
      {
        this.newDepreciation = 
        {
          depreciationId: selectedDepreciation.depreciationId,
          percentage: this.depreciationform.get('percentage')?.value,
          date: new Date(0)
        }
        this.ventrixdbservice.updateDepreciation(this.newDepreciation).subscribe()
          //redirects back to data table and refreshes
          //Sweet alerts are used as notifications
          Swal.fire({
            icon: 'success',
            title: 'Depreciation Updated Successfully',
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
    }
  }

  deleteDepreciation(selectedDepreciation: Depreciation)
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
        this.ventrixdbservice.deleteDepreciation(selectedDepreciation).subscribe();
        this.router.navigate(['/depreciation']).then(() => {
        window.location.reload();
        });
      }
    })  
  }
}