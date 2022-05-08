import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-employee',
  templateUrl: './read-employee.component.html',
  styleUrls: ['./read-employee.component.css']
})
export class ReadEmployeeComponent implements OnInit {
  employees:any[] = [];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.employees = response;
      console.log(this.employees)
    })
  }

  addEmployee()
  {
    this.router.navigate(['/create-employee']);
  }

  editEmployee(selectedEmployee: Employee)
  {
      this.ventrixdbservice.setEmployee(selectedEmployee);
      this.router.navigate(['/update-employee']);
  }

  //Delete Client Function 
  deleteEmployee(selectedEmployee: Employee)
  {
    this.ventrixdbservice.deleteEmployee(selectedEmployee).subscribe();
    location.reload();
  }
}
