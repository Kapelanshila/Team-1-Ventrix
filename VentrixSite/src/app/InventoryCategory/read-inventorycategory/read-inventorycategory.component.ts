import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { InventoryCategory } from 'src/app/shared/InventoryCategory';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-inventorycategory',
  templateUrl: './read-inventorycategory.component.html',
  styleUrls: ['./read-inventorycategory.component.css']
})
export class ReadInventorycategoryComponent implements OnInit {
  inventorycategories:any[] = [];
  inventorytypes:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  found =false;

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
    this.ventrixdbservice.readInventoryCategory()
    .subscribe(response => {
      this.inventorycategories = response;
      console.log(this.inventorycategories)
    })
    this.ventrixdbservice.clearInventoryCategory();
  }

  addInventoryCategory()
  {
    this.router.navigate(['/create-inventorycategory']);
  }

  // Copy
  pageChange(newPage: number) {
		this.router.navigate(['/read-inventorycategory'], { queryParams: { page: newPage } })
  }
// Copy


  editInventoryCategory(selectedinventorycategory: InventoryCategory)
  {
      this.ventrixdbservice.setInvetoryCategory(selectedinventorycategory);
      this.router.navigate(['/update-inventorycategory']);
  }

  //Delete inventory category Function 
  deleteInventoryCategory(selectedinventorycategory: InventoryCategory)
  {   
    this.ventrixdbservice.readInventoryType()
    .subscribe(response => {
      this.inventorytypes = response;

      this.inventorytypes.forEach(element => {
        if (selectedinventorycategory.inventoryCategoryId == element.inventoryCategoryId)
        {
          this.found = true;
        }
      });

      if (this.found == false || this.inventorytypes.length == 0)
      {
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'info',
          title: 'Are you sure you want to delete this inventory category?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.deleteInventoryCategory(selectedinventorycategory).subscribe();
            this.router.navigate(['/read-inventorycategory']).then(() => {
            window.location.reload();
            });
          }
        })  
      }
      else
      {
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'warning',
          title: 'Cannot Delete',
          text: 'Delete associated types first',
          confirmButtonText: 'OK',
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
    })
  }

  //Searches through inventory category first validates if there is spaace or no search was add then call api to search
  searchInventoryCategory()
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
            this.router.navigate(['/read-inventorycategory']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
      else
      {
          this.ventrixdbservice.searchInventoryCategory(this.query.toString()).subscribe(response => {
          this.inventorycategories = response;
          if (this.inventorycategories.length == 0)
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
              this.router.navigate(['/read-inventorycategory']).then(() => {
                window.location.reload();
              });
            }
          })  
          }
          console.log(this.inventorycategories)
        })
      }  
  }

  viewInventoryCategory(selectedinventorycategory: InventoryCategory)
  {
    this.ventrixdbservice.setInvetoryCategory(selectedinventorycategory);
    this.router.navigate(['/read-inventorytype']);
  }

}
