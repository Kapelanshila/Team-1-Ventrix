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
  selector: 'app-read-checkout',
  templateUrl: './read-checkout.component.html',
  styleUrls: ['./read-checkout.component.css']
})
export class ReadCheckoutComponent implements OnInit {
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
  selecteditem!: AssignedAsset; 
  clicked = false;
  order!: ClientOrder;
  filename: string = '';
  selected!: FileList;
  checkouts:any[] = [];
  disabled = false;
  checkout!:CheckOutAsset;
  checkoutform : FormGroup;

  constructor(fbuilder: FormBuilder, private ventrixdbservice:VentrixDBServiceService, private router: Router, private http:HttpClient) 
  { 
    this.checkoutform = fbuilder.group({
      assignedAssetId: new FormControl (0),
      checkOutAssetId: new FormControl (0),
      assetId: new FormControl (''),
      employeeId: new FormControl (''),
      document: new FormControl (''),
      date: new FormControl (null),
      userId: new FormControl (''),
    });
  }
  
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
            if (element.checkedOut == false)
            {
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
            }
          });
       })
     })
   })
  }

   //Modal
   displayStyle = "none";
  
   openPopup(selectedentry: AssignedAsset) {
    this.selecteditem = selectedentry;
    this.displayStyle = "block";
   }
 
   closePopup() {

    if (this.filename != '')
    {
      this.ventrixdbservice.deleteCheckOutDocument(this.filename).subscribe();
    }

    this.filename = '';
     this.displayStyle = "none";
   }

   
   help()
   {
     this.ventrixdbservice.setPage(169);
     this.router.navigate(['/help']).then(() => {
       });
   }

   checkOut()
   {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to check out this asset: '+this.selecteditem.assetname+'?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        //Check out Asset
        this.checkoutform.patchValue({
          userId: this.ventrixdbservice.getAccount().userId,
          employeeId: this.selecteditem.employeeId,
          assetId:  this.selecteditem.assetId,
          document: this.filename,
          date: new Date(),
          assignedAssetId: this.selecteditem.assignedAssetId
        })
        Swal.fire({
          icon: 'success',
          title: 'Asset Checked Out',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            //Delete the Asset From Assigned Assets
            this.ventrixdbservice.createCheckOutAsset(this.checkoutform.value).subscribe();
            this.router.navigate(['/read-checkout']).then(() => {
            window.location.reload();
            });
          }
        })  
      }
    })  
   }

   viewCheckOuts()
   {
    this.router.navigate(['/view-checkout']);
   }

   uploadFile = (files: FileList) => {
    //In the event the user attempts to upload more than one file 

    if (this.clicked == true && this.filename != '')
    {
      this.ventrixdbservice.deleteCheckOutDocument(this.filename).subscribe();
    }
    
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      this.filename = fileToUpload.name;

      //Checks files dont have the same name 
      this.ventrixdbservice.readCheckOutAsset()
      .subscribe(response => {
        this.checkouts = response;
        this.checkout = this.checkouts.find(x => x.document.toLowerCase() == this.filename.toLowerCase());

        if (this.checkout != undefined)
        {
          this.filename = '';
          this.disabled = true;
          Swal.fire({
            icon: 'warning',
            title: 'Duplicate File Name',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
        else
        {
          this.disabled = false;
          formData.append('file', fileToUpload, fileToUpload.name);
  
          //Send file to api to be stored
          this.http.post('https://localhost:44324/api/File/uploadCheckOutDocument', formData).subscribe();
    
          this.clicked = true;
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
            this.router.navigate(['/read-checkout']).then(() => {
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
                    if (element.checkedOut == false)
                    {
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
                    }
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
                        this.router.navigate(['/read-checkout']).then(() => {
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
                  this.router.navigate(['/read-checkout']).then(() => {
                    window.location.reload();
                  });
                }
              })  
            }

        })
      }
  }

  

  
}
