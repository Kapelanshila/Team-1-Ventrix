import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deliverystatus } from 'src/app/shared/Deliverystatus';
import { Router } from '@angular/router';
//Make sure swal is imported
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-deliverystatus',
  templateUrl: './read-deliverystatus.component.html',
  styleUrls: ['./read-deliverystatus.component.css']
})
export class ReadDeliverystatusComponent implements OnInit {
  deliverystatuses:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
  }

  ngOnInit(): void {
    
    this.ventrixdbservice.readDeliverystatus()
    .subscribe(response => {
      this.deliverystatuses = response;
      console.log(this.deliverystatuses)
    })
  }
  addDeliverystatus()
  {
    this.router.navigate(['/create-deliverystatus']);
  }

  pageChange(newPage: number) {
		this.router.navigate(['/read-client'], { queryParams: { page: newPage } })
  }

  editDeliverystatus(selectedDeliverystatus: Deliverystatus)
  {
      this.ventrixdbservice.setDeliverystatus(selectedDeliverystatus);
      this.router.navigate(['/update-deliverystatus']);
  }

  //Delete Delivery Status Function 
  deleteDeliverystatus(selectedDeliverystatus: Deliverystatus)
  { 
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this delivery status?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteDeliverystatus(selectedDeliverystatus).subscribe();
          this.router.navigate(['/read-deliverystatus']).then(() => {
          window.location.reload();
          });
        }
      })  
  }
}

