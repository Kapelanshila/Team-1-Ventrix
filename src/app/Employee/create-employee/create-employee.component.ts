import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeform : FormGroup;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.employeeform = fbuilder.group({
      Name: new FormControl ('',[Validators.required]),
      Surname: new FormControl ('',[Validators.required]),
      IdNumber: new FormControl ('',[Validators.required]),
      PhoneNumber: new FormControl ('',[Validators.required]),
      HomeAddress: new FormControl ('',[Validators.required]),
      EmailAddress: new FormControl ('',[Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  
  //Form submit calls add employee function
  addEmployee()
  {
    console.log(this.employeeform.value);
    this.ventrixdbservice.createEmployee(this.employeeform.value).subscribe()
        //redirects back to data table and refreshes
        this.router.navigate(['/read-employee']).then(() => {
          window.location.reload();
        });
  }


  //When Cancel button clicked returns to Read employee screen
  returnDataTable()
  {
    this.router.navigate(['/read-employee']);
  }

}
