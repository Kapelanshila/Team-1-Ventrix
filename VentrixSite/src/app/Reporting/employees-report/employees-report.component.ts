import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EmployeeR } from 'src/app/shared/EmployeeR';
import { Asset } from 'src/app/shared/Asset';
import { Account } from 'src/app/shared/Account';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-employees-report',
  templateUrl: './employees-report.component.html',
  styleUrls: ['./employees-report.component.css']
})
export class EmployeesReportComponent implements OnInit {


  employees:EmployeeR[] = [];
  users:any[] = [];
  roles:any[] = [];
  role:any;
  user:any;
  data:Employee[] = [];
  item!:EmployeeR;
  assets:Asset[] = [];
  assignedassets:any[] = [];
  eassets:any[] = [];
  vassets:any[] = [];
  account!:Account;
  date!:Date;
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
      //Inorder to display who generated it 
      this.account = this.ventrixdbservice.getAccount();

      //To display date
      this.date = new Date();

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

          this.ventrixdbservice.readAsset()
          .subscribe(response => {
            this.assets = response;

          this.ventrixdbservice.readAssignedAssets()
          .subscribe(response => {
            this.assignedassets = response;


          this.data.forEach(element => {
            this.user = this.users.find(x => x.userId == element.userId);
            this.role = this.roles.find(x => x.userRoleId == this.user.userRoleId);
            this.eassets = [];

            //Gets Assigned Assets currently in use by the Employee
            this.assignedassets.forEach(assignment => {
              if (assignment.checkedIn == false && assignment.checkedOut == true && assignment.employeeId == element.employeeId)
              {
                this.eassets.push(this.assets.find(x => x.assetId  == assignment.assetId));
              }
            });
  

            if (element.idnumber != undefined && this.role.description != 'Master')
            {
              this.item =
              {
                employeeId: element.employeeId,
                name : element.name,
                surname: element.surname,
                idnumber: element.idnumber,
                phoneNumber: element.phoneNumber,
                homeAddress: element.homeAddress,
                emailAddress: element.emailAddress,
                titleId: element.titleId,
                userId: element.userId,
                assets:  this.eassets,
                account: this.account.name+' '+this.account.surname
              }
              this.employees.push(this.item);

            }
            this.vassets.push(this.eassets);
          });

        })
  
      })
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

  generateExcel()
  {
    this.ventrixdbservice.generateExcelEmployeeReport(this.employees).subscribe(res => {
      const data = new Blob([res] , { type: 'application/vnd.ms-excel' });
     saveAs(data,"Employee List Report");
   });
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
      text: 'Deleting this employee will remove user information',
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
      })
    }
  }

  
help()
{
  this.ventrixdbservice.setPage(224);
  this.router.navigate(['/help']).then(() => {
    });
}

    // PDF Options
    openPDF(){
      let Data = document.getElementById('htmlData')!;
    
      html2canvas(Data).then(canvas => {
        let fileWidth = 210;
        let fileHeight = canvas.height * fileWidth / canvas.width;
    
        const contentDataUrl = canvas.toDataURL('image/png');
    
        let PDF = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4'
        });
    
        let topPosition = 10;
        let leftPosition = 0;
    
        PDF.addImage(contentDataUrl, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
        PDF.save('Employee List Report.pdf');
      }
    
      )
    }

    download()
  {
    this.ventrixdbservice.generateEmployeePDFReport(this.employees)
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
     saveAs(data,"Employee Report");
   });
  }
  
}
