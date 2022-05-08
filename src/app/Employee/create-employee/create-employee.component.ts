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
    });
  }

  ngOnInit(): void {
    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.titles = response;
      console.log(this.titles)
    })
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
