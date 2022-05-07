import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WarrantyPeriod} from 'src/app/shared/WarrantyPeriod';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-readwarrantyperiod',
  templateUrl: './readwarrantyperiod.component.html',
  styleUrls: ['./readwarrantyperiod.component.css']
})
export class ReadwarrantyperiodComponent implements OnInit {
  warrantyPeriods:any[] = [];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }


  ngOnInit(): void 
  {
    this.ventrixdbservice.readWarrantyPeriod()
    .subscribe(response => {
      this.warrantyPeriods = response;
      console.log(this.warrantyPeriods)
    })
  }

  addWarrantyPeriod()
  {
    this.router.navigate(['/create-warranty-period']);
  }

  editWarrantyPeriod(selectedWarrantyPeriod: WarrantyPeriod)
  {
      this.ventrixdbservice.setWarrantyPeriod(selectedWarrantyPeriod);
      this.router.navigate(['/update-warranty-period']);
  }

  //Delete WarrantyPeriod 
  deleteWarrantyPeriod(selectedWarrantyPeriod: WarrantyPeriod)
  {
    Swal.fire({
      icon: 'warning',
      heading: 'Delete warranty period',
      title: 'Are you sure you would like to delete this warranty period?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      confirmButtonColor: '#077bff',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
    this.ventrixdbservice.deleteWarrantyPeriod(selectedWarrantyPeriod).subscribe();
    this.router.navigate(['/read-warranty-period']).then(() => {
      window.location.reload();
    });
  }
})  
}
}
