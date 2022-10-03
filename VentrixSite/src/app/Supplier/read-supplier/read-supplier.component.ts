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
  supplierorders:any = [];
  inventories:any = [];
  query:string = '';
    // Copy
    p: number = 1;
    config: any; 
    noOfRows = 10;
    // Copy
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readSupplier()
    .subscribe(response => {
      this.suppliers = response;
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
    this.ventrixdbservice.readSupplierOrder().subscribe(response => {
      this.supplierorders = response;

      this.ventrixdbservice.readInventory().subscribe(response => {
        this.inventories = response;

      if (this.supplierorders.find((x: { supplierId: Number; }) => x.supplierId == selectedsupplier.supplierId) == undefined && this.inventories.find((x: { supplierId: Number; }) => x.supplierId == selectedsupplier.supplierId) == undefined)
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
          else
          {
            Swal.fire({
              icon: 'warning',
              title: 'Supplier Associated to other entries',
              text: 'Supplier associated to inventory items or supplier orders',
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

  searchSupplier()
  {
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
          this.router.navigate(['/read-supplier']).then(() => {
            window.location.reload();
          });
        }
      })
    }
    else
    {
      this.ventrixdbservice.searchSupplier(this.query.toString()).subscribe(response => {
        this.suppliers = response;
        if (this.suppliers.length == 0)
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
              this.router.navigate(['read-supplier']).then(() => {
                window.location.reload();
              });
            }
          })
        }
      })
    }
  }
}
