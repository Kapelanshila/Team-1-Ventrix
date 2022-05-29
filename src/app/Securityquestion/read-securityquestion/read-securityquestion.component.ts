import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Securityquestion } from 'src/app/shared/SecurityQuestion';
import { Router } from '@angular/router';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { UserSecurityQuestion } from 'src/app/shared/UserSecurityQuestion';

@Component({
  selector: 'app-read-securityquestion',
  templateUrl: './read-securityquestion.component.html',
  styleUrls: ['./read-securityquestion.component.css']
})
export class ReadSecurityquestionComponent implements OnInit {
  securityquestions:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  found = false;
  usersecurityquestions:any[] = [];

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
  }

  ngOnInit(): void {
    this.ventrixdbservice.readSecurityquestion()
    .subscribe(response => {
      this.securityquestions = response;
      console.log(this.securityquestions)
    })
  }
  addSecurityquestion()
  {
    this.router.navigate(['/create-securityquestion']);
  }

  pageChange(newPage: number) {
		this.router.navigate(['/read-client'], { queryParams: { page: newPage } })
  }

  editSecurityquestion(selectedSecurityquestion: Securityquestion)
  {
      this.ventrixdbservice.setSecurityquestion(selectedSecurityquestion);
      this.router.navigate(['/update-securityquestion']);
  }

  //Delete Security question Function 
  deleteSecurityquestion(selectedSecurityquestion: Securityquestion)
  { 
    this.found = false;
    if (this.securityquestions.length > 3)
    {
      this.ventrixdbservice.readUserSecurityQuestion()
      .subscribe(response => {
        this.usersecurityquestions = response;

        this.usersecurityquestions.forEach(element => {
          if (selectedSecurityquestion.securityQuestionId == element.securityQuestionId)
          {
            this.found = true;
          }
        })
   

      if (this.found == false || this.usersecurityquestions.length == 0)
      {
            //Sweet alerts are used as notifications
            Swal.fire({
              icon: 'warning',
              title: 'Are you sure you want to delete this security question?',
              showDenyButton: true,
              confirmButtonText: 'Yes',
              denyButtonText: `No`,
              confirmButtonColor: '#077bff',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.ventrixdbservice.deleteSecurityquestion(selectedSecurityquestion).subscribe();
                this.router.navigate(['/read-securityquestion']).then(() => {
                window.location.reload();
                });
              }
            })  
        }
        else
        {
          //Sweet alerts are used as notifications
          Swal.fire({
            icon: 'error',
            title: 'Cannot Delete',
            text: 'This Security Question is being used',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
      })
    }
    else
    {    
      Swal.fire({
        icon: 'warning',
        title: 'There must be atleast 3 security questions that exist on the system',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
            this.router.navigate(['/read-securityquestion']).then(() => {
            window.location.reload();
          });
        }
      })  
    }
     
  }
}

