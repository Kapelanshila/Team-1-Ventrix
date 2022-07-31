import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryType } from 'src/app/shared/InventoryType';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { InventoryCategory } from 'src/app/shared/InventoryCategory';

@Component({
  selector: 'app-read-inventory-type',
  templateUrl: './read-inventory-type.component.html',
  styleUrls: ['./read-inventory-type.component.css']
})
export class ReadInventoryTypeComponent implements OnInit {
  inventorytypes:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  inventorycategory!: InventoryCategory;
  specifictypes:any[] = [];
  inventories:any[] = [];

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
    this.inventorycategory = this.ventrixdbservice.getInventoryCategory()!;
    console.log(this.inventorycategory)
    this.ventrixdbservice.readInventoryType()
    .subscribe(response => {
      this.inventorytypes = response;
      console.log(this.inventorytypes)
      this.inventorytypes.forEach(element => {
        if (element.inventoryCategoryId == this.inventorycategory.inventoryCategoryId)
        {
          this.specifictypes.push(element);
        }
        console.log(this.specifictypes);
      });
    })

  }

  addinventorytype()
  {
    this.router.navigate(['/create-inventorytype']);
  }

  // Copy
  pageChange(newPage: number) {
		this.router.navigate(['/read-inventorytype'], { queryParams: { page: newPage } })
  }
// Copy


  editinventorytype(selectedinventorytype: InventoryType)
  {
      this.ventrixdbservice.setInventoryType(selectedinventorytype);
      this.router.navigate(['/update-inventorytype']);
  }

  //Delete inventory category Function 
  deleteinventorytype(selectedinventorytype: InventoryType)
  { 
    this.ventrixdbservice.readInventory()
    .subscribe(response => {
      this.inventories = response;
      if (this.inventories.find(x => x.inventoryTypeId == selectedinventorytype.inventoryTypeId))
      {
        Swal.fire({
          icon: 'error',
          title: 'Cannot Delete Type',
          text: 'Delete associated inventory item first',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
      else
      {
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this inventory type?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteInventoryType(selectedinventorytype).subscribe();
          this.router.navigate(['/read-inventorytype']).then(() => {
          window.location.reload();
          });
        }
      })  
      }
    })
  } 
}
