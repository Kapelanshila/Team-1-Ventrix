import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from 'src/app/shared/Employee';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.css']
})
export class ViewUserDetailsComponent implements OnInit {
  employees:any[] = [];
  p: number = 1;
  config: any;
  noOfRows = 10;

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readEmployee()
    .subscribe(response => {
      this.employees = response;
    })
  }

  updateUserDetails()
  {
    this.router.navigate(['/update-user-details']);
  
  }
}
