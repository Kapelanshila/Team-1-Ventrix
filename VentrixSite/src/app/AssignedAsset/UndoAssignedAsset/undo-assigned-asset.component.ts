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


@Component({
  selector: 'app-undo-assigned-asset',
  templateUrl: './undo-assigned-asset.component.html',
  styleUrls: ['./undo-assigned-asset.component.css']
})
export class UndoAssignedAssetComponent implements OnInit {
  p: number = 1;
  config: any; 
  noOfRows = 10;
  //Search query 
  query:string = '';
  readassignments:AssignedAsset[] =[];
  employees:any[] = [];
  assets:any[] = [];
  item!: AssignedAsset;
  assignedAssets:AssignedAsset[] =[];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { }
  
  ngOnInit(): void
  {
    this.ventrixdbservice.readAssignedAssets()
    .subscribe(response => {
      this.readassignments = response;

      this.ventrixdbservice.readEmployee()
      .subscribe(response => {
        this.employees = response;

        
      this.ventrixdbservice.readAsset()
      .subscribe(response => {
        this.assets = response;

          this.readassignments.forEach(element => {
            this.item = 
            {
              assetId: element.assetId,
              assignedAssetId: element.assignedAssetId,
              employeeId: element.employeeId,
              assetname: this.assets.find(x => x.assetId == element.assetId).name,
              employeename: this.employees.find(x => x.employeeId == element.employeeId).name,
              employeesurname: this.employees.find(x => x.employeeId == element.employeeId).surname,
              email: this.employees.find(x => x.employeeId == element.employeeId).emailAddress,
              userId: this.ventrixdbservice.getAccount().userId,
              date: element.date,
              checkedIn: element.checkedIn,
              checkedOut: element.checkedOut
            }

            this.assignedAssets.push(this.item);
          });
       })
     })
   })
  }

  undoAssignment(selectedAssignment: AssignedAsset)
  {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to undo this?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Asset Unassigned',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.undoAssignment(selectedAssignment).subscribe();
            this.router.navigate(['/undo-assigned-asset']).then(() => {
            window.location.reload();
            });
          }
        })  
      }
    })  
  }

  
  searchAssignedAssets()
  { 
    this.assignedAssets = []
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
        this.ventrixdbservice.searchAssignment(this.query.toString()).subscribe(response => {
          //Same Read as intializer
          this.readassignments = response;

            //Neccessary to get the most up-to-date status
            if (this.readassignments.length != 0)
            {
              this.ventrixdbservice.readEmployee()
              .subscribe(response => {
                this.employees = response;

                this.ventrixdbservice.readAsset()
                .subscribe(response => {
                  this.assets = response;

               
                  this.readassignments.forEach(element => {
                  
                  this.item = 
                  {
                    assetId: element.assetId,
                    assignedAssetId: element.assignedAssetId,
                    employeeId: element.employeeId,
                    assetname: this.assets.find(x => x.assetId == element.assetId).name,
                    employeename: this.employees.find(x => x.employeeId == element.employeeId).name,
                    employeesurname: this.employees.find(x => x.employeeId == element.employeeId).surname,
                    email: this.employees.find(x => x.employeeId == element.employeeId).emailAddress,
                    userId: this.ventrixdbservice.getAccount().userId,
                    date: element.date,
                    checkedIn: element.checkedIn,
                    checkedOut: element.checkedOut
                  }

                  this.assignedAssets.push(this.item);
                });


                  if (this.assignedAssets.length == 0 && this.query != '')
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
