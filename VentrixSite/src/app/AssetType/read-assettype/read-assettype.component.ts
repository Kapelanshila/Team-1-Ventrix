import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetType } from 'src/app/shared/AssetType';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { AssetCategory } from 'src/app/shared/AssetCategory';

@Component({
  selector: 'app-read-assettype',
  templateUrl: './read-assettype.component.html',
  styleUrls: ['./read-assettype.component.css']
})
export class ReadAssettypeComponent implements OnInit {
  assettypes:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  assetcategory!: AssetCategory;
  specifictypes:any[] = [];

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
    this.assetcategory = this.ventrixdbservice.getAssetCategory()!;
    console.log(this.assetcategory)
    this.ventrixdbservice.readAssetType()
    .subscribe(response => {
      this.assettypes = response;
      console.log(this.assettypes)
      this.assettypes.forEach(element => {
        if (element.assetCategoryId == this.assetcategory.assetCategoryId)
        {
          this.specifictypes.push(element);
        }
        console.log(this.specifictypes);
      });
    })
  }

  addassettype()
  {
    this.router.navigate(['/create-assettype']);
  }

  // Copy
  pageChange(newPage: number) {
		this.router.navigate(['/read-assettype'], { queryParams: { page: newPage } })
  }
// Copy


  editassettype(selectedassettype: AssetType)
  {
      this.ventrixdbservice.setAssetType(selectedassettype);
      this.router.navigate(['/update-assettype']);
  }

  //Delete asset category Function 
  deleteassettype(selectedassettype: AssetType)
  { 
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this asset type?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteAssetType(selectedassettype).subscribe();
          this.router.navigate(['/read-assettype']).then(() => {
          window.location.reload();
          });
        }
      })  
  } 
}
