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
  titles:any[] = [];
  employeeform : FormGroup;
  employee:Employee | undefined;
  submitted = false;
  constructor(fbuilder: FormBuilder, private router: Router,private ventrixdbservice:VentrixDBServiceService)
  {
      //Additional Validation can be added here
      this.employeeform = fbuilder.group({
      name: new FormControl ('',[Validators.required]),
      surname: new FormControl ('',[Validators.required]),
      idNumber: new FormControl ('',[Validators.required]),
      phoneNumber: new FormControl ('',[Validators.required]),
      homeAddress: new FormControl ('',[Validators.required]),
      emailAddress: new FormControl ('',[Validators.required]),
      titleId: new FormControl ('',[Validators.required]),   
    });
  }

  ngOnInit(): void {
    this.ventrixdbservice.readTitle()
    .subscribe(response => {
      this.titles = response;
      console.log(this.titles)
    })
  }
  
  //Form submit calls add employee function
  addEmployee()
  {
     //Creates new employee object
    const value = { ...this.employeeform.value, titleId: +this.employeeform.value.titleId };
    this.employee = 
    {
      employeeId:0,
      name:this.employeeform.get('name')?.value,
      surname:this.employeeform.get('surname')?.value,
      idnumber:this.employeeform.get('idNumber')?.value,
      phoneNumber:this.employeeform.get('phoneNumber')?.value,
      homeAddress:this.employeeform.get('homeAddress')?.value,
      emailAddress:this.employeeform.get('emailAddress')?.value,
      titleId:Number(this.employeeform.get('titleId')?.value),
      userId:0
    }
    console.log(this.employee);
    this.ventrixdbservice.createEmployee(this.employee).subscribe()
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
