import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WriteOffReason } from 'src/app/shared/WriteOffReason';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-writeoffreason',
  templateUrl: './read-writeoffreason.component.html',
  styleUrls: ['./read-writeoffreason.component.css']
})
export class ReadWriteoffreasonComponent implements OnInit {
  writeoffreasons:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  writeoff!:any;
  assetwriteoff!:any;
  //Search query 
  query:string = '';
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { 
    // Copy
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
     // Copy
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readWriteOffReason()
    .subscribe(response => {
      this.writeoffreasons = response;
      console.log(this.writeoffreasons)
    })
  }

  addWriteOffReason()
  {
    this.router.navigate(['/create-writeoffreason']);
  }

  // Copy
  pageChange(newPage: number) {
		this.router.navigate(['/read-writeoffreason'], { queryParams: { page: newPage } })
  }
// Copy

  editWriteOffReason(selectedwriteoffreason: WriteOffReason)
  {
      this.ventrixdbservice.setWriteOffReason(selectedwriteoffreason);
      this.router.navigate(['/update-writeoffreason']);
  }

  //Delete write-off reason Function 
  deleteWriteOffReason(selectedwriteoffreason: WriteOffReason)
  { 
    
    this.ventrixdbservice.readInventoryWriteOffLine()
    .subscribe(response => {
      this.writeoff = response;

      this.ventrixdbservice.readAssetWriteOff()
      .subscribe(response => {
        this.assetwriteoff = response;

      if (this.writeoff.find((x: { writeOffReasonId: Number; }) => x.writeOffReasonId == selectedwriteoffreason.writeOffReasonId) && undefined || this.assetwriteoff.find((x: { writeOffReasonId: Number; }) => x.writeOffReasonId == selectedwriteoffreason.writeOffReasonId) == undefined)
      {
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure you want to delete this write-off reason?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.deleteWriteReason(selectedwriteoffreason).subscribe();
            this.router.navigate(['/read-writeoffreason']).then(() => {
            window.location.reload();
            });
          }
        })  
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Write Off Reason Assoiciated to other entries',
            showDenyButton: false,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
        }
      })
    })
  }
}
