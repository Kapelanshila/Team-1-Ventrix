import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeform : FormGroup;
  employee: Employee|undefined;
  updatedemployee: Employee|undefined;
  submitted = false;
  titles:any[] = [];
  selectedTitle:Title|undefined;
  
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.employeeform = fbuilder.group({
      //Employee ID is not displayed but is neccessary for the API to update
      employeeId: new FormControl('',[Validators.required]),
      userId: new FormControl ('',[Validators.required]),
      name: new FormControl ('',[Validators.required]),
      surname: new FormControl ('',[Validators.required,]),
      idNumber: new FormControl ('',[Validators.required]),
      phoneNumber: new FormControl ('',[Validators.required]),
      homeAddress: new FormControl ('',[Validators.required]),
      emailAddress: new FormControl ('',[Validators.required]),
      titleId: new FormControl ('',[Validators.required]),
    });
  }

    //Populate Input values
    ngOnInit(): void 
    {
      this.employee = this.ventrixdbservice.getEmployee();
      this.employeeform.patchValue({
      employeeId: this.employee?.employeeId,
      name: this.employee?.name,
      surname: this.employee?.surname,
      idNumber: this.employee?.idnumber,
      phoneNumber: this.employee?.phoneNumber,
      homeAddress: this.employee?.homeAddress,
      emailAddress: this.employee?.emailAddress,
      titleId: this.employee?.titleId,
      userId: this.employee?.userId,
      })
      console.log(this.employeeform.value)
      this.ventrixdbservice.clearEmployee();

      this.ventrixdbservice.readTitle()
      .subscribe(response => {
        this.titles = response;
        console.log(this.titles)
      })
    }

    updateEmployee()
    {
    //Creates new employee object
    this.updatedemployee = 
    {
      employeeId:this.employee!.employeeId,
      name:this.employeeform.get('name')?.value,
      surname:this.employeeform.get('surname')?.value,
      idnumber:this.employeeform.get('idNumber')?.value,
      phoneNumber:this.employeeform.get('phoneNumber')?.value,
      homeAddress:this.employeeform.get('homeAddress')?.value,
      emailAddress:this.employeeform.get('emailAddress')?.value,
      titleId:Number(this.employeeform.get('titleId')?.value),
      userId:0
    }
    console.log(this.updateEmployee)
      this.ventrixdbservice.updateEmployee(this.updatedemployee).subscribe();
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

    setTitle(value:Title)
    {
      this.selectedTitle = value;
    }
}
