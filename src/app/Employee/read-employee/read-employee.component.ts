import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-employee',
  templateUrl: './read-employee.component.html',
  styleUrls: ['./read-employee.component.css']
})
export class ReadEmployeeComponent implements OnInit {

  employees:any[] = [];
  p: number = 1;
  config: any;
  noOfRows = 10;
  //Search query
  query:string = '';
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
   }

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

  pageChange(newPage: number) {
    this.router.navigate(['/read-employee'], {queryParams:{page: newPage}})
  }

  editEmployee(selectedEmployee: Employee)
  {
      this.ventrixdbservice.setEmployee(selectedEmployee);
      this.router.navigate(['/update-employee']);
  }

  //Delete Client Function 
  deleteEmployee(selectedEmployee: Employee)
  {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete this employee?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventrixdbservice.deleteEmployee(selectedEmployee).subscribe();
        this.router.navigate(['/read-employee']).then(() => {
          window.location.reload();
        });
      }
    })
    
  }

  searchEmployee()
  {
    if(this.query == '' || this.query.replace(/\s/g, '').length==0)
    {
      Swal.fire({
        icon: 'error',
        title: 'Invalid search',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/read-employee']).then(()=>{
            window.location.reload();
          });
        }
      })
    }
    else
    {
      this.ventrixdbservice.searchEmployee(this.query.toString()).subscribe(response => {
        this.employees = response;
        if(this.employees.length ==0)
        {
          Swal.fire({
            icon: 'error',
            title: 'No Results Found',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if(result.isConfirmed) {
              this.router.navigate(['/read-employee']).then(() => {
                window.location.reload();
              });
            }
          })
        }
        console.log(this.employees)
      })
    }
  }
}
