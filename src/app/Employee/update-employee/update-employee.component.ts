import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeform : FormGroup;
  employee: Employee|undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.employeeform = fbuilder.group({
      //Employee ID is not displayed but is neccessary for the API to update
      employeeid: new FormControl('',[Validators.required]),
      name: new FormControl ('',[Validators.required]),
      surname: new FormControl ('',[Validators.required,]),
      idNumber: new FormControl ('',[Validators.required]),
      phoneNumber: new FormControl ('',[Validators.required]),
      homeAddress: new FormControl ('',[Validators.required]),
      emailAddress: new FormControl ('',[Validators.required]),
      title: new FormControl ('',[Validators.required]),
    });
  }

    //Populate Input values
    ngOnInit(): void 
    {
      this.employee = this.ventrixdbservice.getEmployee();
      this.employeeform.patchValue({
      EmployeeId: this.employee?.employeeId,
      Name: this.employee?.name,
      Surname: this.employee?.surname,
      IdNumber: this.employee?.idNumber,
      PhoneNumber: this.employee?.phoneNumber,
      HomeAddress: this.employee?.homeAddress,
      EmailAddress: this.employee?.emailAddress,
      Title: this.employee?.title,
      })

      this.ventrixdbservice.clearEmployee();
    }

    updateEmployee()
    {
      this.ventrixdbservice.updateEmployee(this.employeeform.value).subscribe();
      //redirects back to data table and refreshes page
      this.router.navigate(['/read-employee']).then(() => {
        window.location.reload();
      });
    
    }

    //When Cancel button clicked returns to Read Employee screen
    returnDataTable()
    {
      this.router.navigate(['/read-employee']);
    }
}
