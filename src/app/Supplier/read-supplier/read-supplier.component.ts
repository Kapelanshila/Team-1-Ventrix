import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier } from 'src/app/shared/Supplier';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-supplier',
  templateUrl: './read-supplier.component.html',
  styleUrls: ['./read-supplier.component.css']
})
export class ReadSupplierComponent implements OnInit {
  suppliers:any[] = [];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readSupplier()
    .subscribe(response => {
      this.suppliers = response;
      console.log(this.suppliers)
    })
  }

  addSupplier()
  {
    this.router.navigate(['/create-supplier']);
  }

  editSupplier(selectedsupplier: Supplier)
  {
      this.ventrixdbservice.setSupplier(selectedsupplier);
      this.router.navigate(['/update-supplier']);
  }

  //Delete Supplier Function 
  deleteSupplier(selectedsupplier: Supplier)
  { 
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this supplier?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteSupplier(selectedsupplier).subscribe();
          this.router.navigate(['/read-supplier']).then(() => {
          window.location.reload();
          });
        }
      })  
  }
}
