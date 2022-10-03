import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetCategory } from 'src/app/shared/AssetCategory';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-assetcategory',
  templateUrl: './read-assetcategory.component.html',
  styleUrls: ['./read-assetcategory.component.css']
})
export class ReadAssetcategoryComponent implements OnInit {
  assetcategories:any[] = [];
  assettypes:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  found =false;

  //Search query 
  query:string = '';
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) 
  { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
    };
  }

  ngOnInit(): void 
  {
    this.ventrixdbservice.readAssetCategory()
    .subscribe(response => {
      this.assetcategories = response;
    })
    this.ventrixdbservice.clearAssetCategory();
  }

  addAssetCategory()
  {
    this.router.navigate(['/create-assetcategory']);
  }

  // Copy
  pageChange(newPage: number) {
		this.router.navigate(['/read-assetcategory'], { queryParams: { page: newPage } })
  }
// Copy


  editAssetCategory(selectedassetcategory: AssetCategory)
  {
      this.ventrixdbservice.setAssetCategory(selectedassetcategory);
      this.router.navigate(['/update-assetcategory']);
  }

  //Delete asset category Function 
  deleteAssetCategory(selectedassetcategory: AssetCategory)
  { 
    this.ventrixdbservice.readAssetType()
    .subscribe(response => {
      this.assettypes = response;
      this.assettypes.forEach(element => {
        if (selectedassetcategory.assetCategoryId == element.assetCategoryId)
        {
          this.found = true;
        }
      });

      if (this.found == false || this.assettypes.length == 0)
      {
        //Sweet alerts are used as notifications
        Swal.fire({
          icon: 'info',
          title: 'Are you sure you want to delete this asset category?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
          confirmButtonColor: '#077bff',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.ventrixdbservice.deleteAssetCategory(selectedassetcategory).subscribe();
            this.router.navigate(['/read-assetcategory']).then(() => {
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

  //Searches through asset category first validates if there is spaace or no search was add then call api to search
  searchAssetCategory()
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
          this.router.navigate(['/read-assetcategory']).then(() => {
            window.location.reload();
          });
        }
      })  
    }
    else
    {
        this.ventrixdbservice.searchAssetCategory(this.query.toString()).subscribe(response => {
        this.assetcategories = response;
        if (this.assetcategories.length == 0)
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
            this.router.navigate(['/read-assetcategory']).then(() => {
              window.location.reload();
            });
          }
        })  
        }
      })
    }  
  }

  viewAssetCategory(selectedassetcategory: AssetCategory)
  {
    this.ventrixdbservice.setAssetCategory(selectedassetcategory);
    this.router.navigate(['/read-assettype']);
  }
}
