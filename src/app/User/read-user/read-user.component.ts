import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';
//Make sure swal is imported
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent implements OnInit {

  users:any[] = [];
  query:string = '';
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readUser()
    .subscribe(response => {
      this.users = response;
      console.log(this.users)
    })
  }

  addUser()
  {
    this.router.navigate(['/create-user']);
  }

  editUser(selecteduser: User)
  {
      this.ventrixdbservice.setUser(selecteduser);
      this.router.navigate(['/update-user']);
  }

  //Delete User Function 
  deleteUser(selecteduser: User)
  { 
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this user?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteUser(selecteduser).subscribe();
          this.router.navigate(['/read-user']).then(() => {
          window.location.reload();
          });
        }
      })  
  }

  searchUser()
  {
    if (this.query == '' || this.query.replace(/\s/g,'').length == 0)
    {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Search',
        confirmButtonText: 'OK',
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/read-user']).then(() => {
            window.location.reload();
          });
        }
      })
    }
    else
    {
      this.ventrixdbservice.searchUser(this.query.toString()).subscribe(response => {
        this.users = response;
        if (this.users.length == 0)
        {
          Swal.fire({
            icon: 'error',
            title: 'No Results Found',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['read-user']).then(() => {
                window.location.reload();
              });
            }
          })
        }
        console.log(this.users)
      })
    }
  }
}
