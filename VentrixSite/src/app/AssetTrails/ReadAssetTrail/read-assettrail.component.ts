import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { ClientOrder } from 'src/app/shared/ClientOrder';
import { ClientOrderVM } from 'src/app/shared/ClientOrderVM';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { InventoryPopup } from 'src/app/shared/InventoryPopUp';
import { AssignedAsset } from 'src/app/shared/AssignedAsset';
import { AssetTrail } from 'src/app/shared/AssetTrail';
import { Employee } from 'src/app/shared/Employee';
import { Asset } from 'src/app/shared/Asset';


@Component({
  selector: 'app-read-assettrail',
  templateUrl: './read-assettrail.component.html',
  styleUrls: ['./read-assettrail.component.css']
})
export class ReadAssettrailComponent implements OnInit {
  p: number = 1;
  config: any; 
  noOfRows = 10;
  //Search query 
  query:string = '';
  readAssetTrails:AssetTrail[] =[];
  employees:any[] = [];
  users:any[] = [];
  employee!:Employee;
  asset!:Asset;
  userRole!:any;
  user!:any;
  roles:any[] = [];
  assets:any[] = [];
  item!: AssetTrail;
  assetTrails:AssetTrail[] =[];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { }
  
  ngOnInit(): void
  {
    this.ventrixdbservice.readAssetTrails()
    .subscribe(response => {
      this.readAssetTrails = response;

      this.ventrixdbservice.readEmployee()
      .subscribe(response => {
        this.employees = response;

        
      this.ventrixdbservice.readAsset()
      .subscribe(response => {
        this.assets = response;
        
      this.ventrixdbservice.readUser()
      .subscribe(response => {
        this.users = response;

                
      this.ventrixdbservice.readRole()
      .subscribe(response => {
        this.roles = response;

          //Neccessary to ignore master role
          this.readAssetTrails.forEach(element => {
            this.user = this.users.find(x => x.userId == element.userId)
            this.userRole = this.roles.find(x => x.userRoleId == this.user.userRoleId).description
            this.employee = this.employees.find(x => x.userId == element.userId)

            if (this.userRole != "Master")
            {
            this.item = 
            {
              assetId: element.assetId,
              employeeId: element.employeeId,
              assetname: this.assets.find(x => x.assetId == element.assetId).name,
              employeename: this.employees.find(x => x.employeeId == this.employee.employeeId).name,
              employeesurname: this.employees.find(x => x.employeeId == this.employee.employeeId).surname,
              email: this.employees.find(x => x.employeeId == this.employee.employeeId).emailAddress,
              userId: this.ventrixdbservice.getAccount().userId,
              date: element.date,
              description: element.description,
              manufacturer: this.assets.find(x => x.assetId == element.assetId).manufacturer
            }
            this.assetTrails.push(this.item);
          }
          });
          
        })
       })
     })
   })
  })
  }
  
  searchAssetTrail()
  { 
    this.assetTrails = []
      if (this.query != '' && this.query.replace(/\s/g, '').length == 0)
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
            this.router.navigate(['/undo-assigned-asset']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
      else
      {
        this.ventrixdbservice.searchAssetTrails(this.query.toString()).subscribe(response => {
          //Same Read as intializer
          this.readAssetTrails = response;

            //Neccessary to get the most up-to-date status
            if (this.readAssetTrails.length != 0)
            {
              this.ventrixdbservice.readEmployee()
              .subscribe(response => {
                this.employees = response;
        
                
              this.ventrixdbservice.readAsset()
              .subscribe(response => {
                this.assets = response;
                
              this.ventrixdbservice.readUser()
              .subscribe(response => {
                this.users = response;
        
                        
              this.ventrixdbservice.readRole()
              .subscribe(response => {
                this.roles = response;
        
                  //Neccessary to ignore master role
                  this.readAssetTrails.forEach(element => {
                    this.user = this.users.find(x => x.userId == element.userId)
                    this.userRole = this.roles.find(x => x.userRoleId == this.user.userRoleId).description
                    this.employee = this.employees.find(x => x.userId == element.userId)
        
                    if (this.userRole != "Master")
                    {
                    this.item = 
                    {
                      assetId: element.assetId,
                      employeeId: element.employeeId,
                      assetname: this.assets.find(x => x.assetId == element.assetId).name,
                      employeename: this.employees.find(x => x.employeeId == this.employee.employeeId).name,
                      employeesurname: this.employees.find(x => x.employeeId == this.employee.employeeId).surname,
                      email: this.employees.find(x => x.employeeId == this.employee.employeeId).emailAddress,
                      userId: this.ventrixdbservice.getAccount().userId,
                      date: element.date,
                      description: element.description,
                      manufacturer: this.assets.find(x => x.assetId == element.assetId).manufacturer
                    }
                    this.assetTrails.push(this.item);
                  }
                });


                  if (this.assetTrails.length == 0 && this.query != '')
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
                        this.router.navigate(['/undo-assigned-asset']).then(() => {
                          window.location.reload();
                        });
                      }
                    })  
                  }
                })
              })
              })
              })
            }
            else
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
                  this.router.navigate(['/undo-assigned-asset']).then(() => {
                    window.location.reload();
                  });
                }
              })  
            }

        })
      }
  }

  

  
}
