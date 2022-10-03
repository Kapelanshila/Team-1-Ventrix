import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
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
import { CheckOutAsset } from 'src/app/shared/CheckOutAsset';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-checkouts',
  templateUrl: './view-checkouts.component.html',
  styleUrls: ['./view-checkouts.component.css']
})
export class ViewCheckoutsComponent implements OnInit {
  p: number = 1;
  config: any; 
  noOfRows = 10;
  //Search query 
  query:string = '';
  employees:any[] = [];
  assets:any[] = [];
  item!: CheckOutAsset;
  selecteditem!: AssignedAsset; 
  clicked = false;
  order!: ClientOrder;
  filename: string = '';
  selected!: FileList;
  disabled = false;
  checkouts:any[] = [];
  checkOutVM:CheckOutAsset[] = [];

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router, private http:HttpClient) 
  { 
  }
  
  ngOnInit(): void
  {
    this.ventrixdbservice.readCheckOutAsset()
    .subscribe(response => {
      this.checkouts = response;

      this.ventrixdbservice.readEmployee()
      .subscribe(response => {
        this.employees = response;

        
      this.ventrixdbservice.readAsset()
      .subscribe(response => {
        this.assets = response;

          this.checkouts.forEach(element => {
            this.item = 
            {              
              checkOutAssetId: element.checkOutAssetId,
              assetId: element.assetId,
              employeeId: element.employeeId,
              assetname: this.assets.find(x => x.assetId == element.assetId).name,
              employeename: this.employees.find(x => x.employeeId == element.employeeId).name,
              employeesurname: this.employees.find(x => x.employeeId == element.employeeId).surname,
              email: this.employees.find(x => x.employeeId == element.employeeId).emailAddress,
              document: element.document,
              date: element.date,
              assignedAssetId: element.assignedAssetId
            }

            this.checkOutVM.push(this.item);
          });
       })
     })
   })
  }

  download(selected: CheckOutAsset)
  {
    this.ventrixdbservice.getCheckOutDocument(selected.document.toString())
    .subscribe(res => {
      const data = new Blob([res] , { type: 'application/pdf' });
     saveAs(data, selected.document.toString());
   });
  }

  
  searchCheckOuts()
  { 
    this.checkOutVM = []
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
        this.ventrixdbservice.searchCheckOut(this.query.toString()).subscribe(response => {
          //Same Read as intializer
          this.checkouts = response;

            //Neccessary to get the most up-to-date status
            if (this.checkouts.length != 0)
            {
              this.ventrixdbservice.readEmployee()
              .subscribe(response => {
                this.employees = response;

                this.ventrixdbservice.readAsset()
                .subscribe(response => {
                  this.assets = response;

               
                  this.checkouts.forEach(element => {
                    this.item = 
                    {              
                      checkOutAssetId: element.checkOutAssetId,
                      assetId: element.assetId,
                      employeeId: element.employeeId,
                      assetname: this.assets.find(x => x.assetId == element.assetId).name,
                      employeename: this.employees.find(x => x.employeeId == element.employeeId).name,
                      employeesurname: this.employees.find(x => x.employeeId == element.employeeId).surname,
                      email: this.employees.find(x => x.employeeId == element.employeeId).emailAddress,
                      document: element.document,
                      date: element.date,
                      assignedAssetId: element.assignedAssetId
                    }
                    this.checkOutVM.push(this.item);
                });


                  if (this.checkOutVM.length == 0 && this.query != '')
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
