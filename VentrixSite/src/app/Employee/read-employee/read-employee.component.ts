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
  users:any[] = [];
  roles:any[] = [];
  trails:any[] = [];
  role:any;
  user:any;
  data:Employee[] = [];
  histories:any = [];
  collectedorders:any = [];
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
    // Only employees registered are show ie. only employees with an ID number
    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.data = response;

      //For master account
      this.ventrixdbservice.readUser()
      .subscribe(response => {
        this.users = response;

        this.ventrixdbservice.readRole()
        .subscribe(response => {
          this.roles = response;


          this.data.forEach(element => {
            this.user = this.users.find(x => x.userId == element.userId);
            this.role = this.roles.find(x => x.userRoleId == this.user.userRoleId);

            if (element.idnumber != undefined && this.role.description != 'Master')
            {
              this.employees.push(element);
            }
          });
        })
  
      })
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
    this.ventrixdbservice.readAssetsLocations().subscribe(response => {
      this.histories = response;

      this.ventrixdbservice.readCollectedorders().subscribe(response => {
        this.collectedorders = response;

        this.ventrixdbservice.readAssetTrails().subscribe(response => {
          this.trails = response;
          console.log(this.trails)

      if (this.histories.find((x: { employeeId: Number; }) => x.employeeId == selectedEmployee.employeeId) == undefined && this.collectedorders.find((x: { employeeId: Number; }) => x.employeeId == selectedEmployee.employeeId) == undefined && this.trails.find((x: { userId: Number; }) => x.userId == selectedEmployee.userId ) == undefined) 
      {
          //Sweet alerts are used as notifications
          Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to delete this employee?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
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
          else
          {
            Swal.fire({
              icon: 'warning',
              title: 'Employee Associated to other entries',
              text: 'Employee associated to asset entries, order entries or is involved with asset transactions',
              showDenyButton: false,
              confirmButtonText: 'Ok',
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            })
          }
        })
      })
    })
  }

  searchEmployee()
  {
    if (this.query != '' && this.query.replace(/\s/g, '').length == 0)
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
