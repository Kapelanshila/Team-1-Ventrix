import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { UserVM } from 'src/app/shared/UserVM';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent implements OnInit {
  p: number = 1;
  config: any;
  noOfRows = 10;
  users:User[] = [];
  roles:any[] = [];
  values:any[] = [];
  employees:any[] = [];
  uservm?:UserVM;
  userroles:any[] = [];
  query:string = '';
  added:boolean = false;
  deleteuser:User|undefined;

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
  }

  ngOnInit(): void 
  {
    //Get user,user roles and employees from api
    this.ventrixdbservice.readUser()
    .subscribe(response => {
      this.users = response;

        this.ventrixdbservice.readRole()
        .subscribe(response => {
        this.roles = response;

        this.ventrixdbservice.readEmployee()
          .subscribe(response => {
            this.employees = response;
              //Possibility no employees exist on the system yet 
              //So an if statement is used to check for this if this was ommited if-else statement would be undefined 
              if (this.employees.length != 0)
              {
                this.users.forEach(user => {   
                  this.added = false;
                  this.roles.forEach(role => {
                    this.employees.forEach(employee => {

                      if (user.userRoleId == role.userRoleId && this.employees.find((x: { userId: Number; }) => x.userId == user.userId) != undefined && this.added == false)
                      {
                        this.uservm = 
                        {
                          userId: user.userId,
                          userRoleId: user.userRoleId,
                          description: role.description,
                          registered: true,
                          hashedPassword:''
                        }
                        this.added = true;
                        console.log(this.uservm)
                      }
                      else if (user.userRoleId == role.userRoleId && this.employees.find((x: { userId: Number; }) => x.userId == user.userId) == undefined && this.added == false)
                      {
                        this.uservm = 
                        {
                          userId: user.userId,
                          userRoleId: user.userRoleId,
                          description: role.description,
                          registered: false,
                          hashedPassword:''
                        }
                        this.added = true;
                        console.log(this.uservm)
                      }
                    });
                  });
                    //Populates it in view model for it to be read in the table 
                    this.userroles.push(this.uservm);
                });
              }
              else 
              {
                this.users.forEach(user => {   
                  this.added = false;
                  this.roles.forEach(role => {
                      if (user.userRoleId == role.userRoleId && user.userId)
                      {
                        this.uservm = 
                        {
                          userId: user.userId,
                          userRoleId: user.userRoleId,
                          description: role.description,
                          registered: false,
                          hashedPassword:''
                        }
                        this.added = true;
                      }
                  });
                    //Populates it in view model for it to be read in the table 
                    this.userroles.push(this.uservm);
                });
              }
            });
        })
    })
  }

  addUser()
  {
    this.router.navigate(['/create-user']);
  }

  editUser(selecteduser: UserVM)
  {
      this.ventrixdbservice.setUser(selecteduser);
      this.router.navigate(['/update-user']);
  }

  //Delete User Function 
  deleteUser(selecteduser: UserVM)
  { 
    this.deleteuser = 
    {
      userId: selecteduser.userId,
      userRoleId: selecteduser.userRoleId,
      hashedPassword: selecteduser.hashedPassword
    }
    if (selecteduser.registered == true)
    {
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this user?',
        text: 'The user currently has a registered account!',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(selecteduser);
          this.ventrixdbservice.deleteUser(this.deleteuser).subscribe();
          this.router.navigate(['/read-user']).then(() => {
          window.location.reload();
          });
        }
      })  
    }
    else
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
          console.log(this.deleteuser);
          this.ventrixdbservice.deleteUser(this.deleteuser).subscribe();
          this.router.navigate(['/read-user']).then(() => {
          window.location.reload();
          });
        }
      })  
    }

  }

  searchUser()
  {
    this.userroles = [];
    if (this.query != '' && this.query.replace(/\s/g,'').length == 0)
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
        else 
        {
          this.ventrixdbservice.readRole()
          .subscribe(response => {
          this.roles = response;

          this.ventrixdbservice.readEmployee()
            .subscribe(response => {
              this.employees = response;
                //Possibility no employees exist on the system yet 
                //So an if statement is used to check for this if this was ommited if-else statement would be undefined 
                if (this.employees.length != 0)
                {
                  this.users.forEach(user => {   
                    this.added = false;
                    this.roles.forEach(role => {
                      this.employees.forEach(employee => {

                        if (user.userRoleId == role.userRoleId && user.hashedPassword != '' && this.added == false)
                        {
                          this.uservm = 
                          {
                            userId: user.userId,
                            userRoleId: user.userRoleId,
                            description: role.description,
                            registered: true,
                            hashedPassword:''
                          }
                          this.added = true;
                          console.log(this.uservm)
                        }
                        else if (user.userRoleId == role.userRoleId && user.hashedPassword == '' && this.added == false)
                        {
                          this.uservm = 
                          {
                            userId: user.userId,
                            userRoleId: user.userRoleId,
                            description: role.description,
                            registered: false,
                            hashedPassword:''
                          }
                          this.added = true;
                          console.log(this.uservm)
                        }
                      });
                    });
                      //Populates it in view model for it to be read in the table 
                      this.userroles.push(this.uservm);
                  });
                }
                else 
                {
                  this.users.forEach(user => {   
                    this.added = false;
                    this.roles.forEach(role => {
                        if (user.userRoleId == role.userRoleId && user.userId)
                        {
                          this.uservm = 
                          {
                            userId: user.userId,
                            userRoleId: user.userRoleId,
                            description: role.description,
                            registered: false,
                            hashedPassword:''
                          }
                          this.added = true;
                        }
                    });
                      //Populates it in view model for it to be read in the table 
                      this.userroles.push(this.uservm);
                  });
                }
              });
          })
        }     
      })
    }
  }
}
