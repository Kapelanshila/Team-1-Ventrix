import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
import { InventoryVM } from 'src/app/shared/InventoryVM';
//Make sure swal is imported
import Swal from 'sweetalert2';
import { InventoryWriteOff } from 'src/app/shared/InventoryWriteOff';
import { InventoryWriteOffLineVM } from 'src/app/shared/InventoryWriteOffLineVM';


@Component({
  selector: 'app-view-write-offs',
  templateUrl: './view-write-offs.component.html',
  styleUrls: ['./view-write-offs.component.css']
})
export class ViewWriteOffsComponent implements OnInit {

  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router)  { }
  inventories:any[] = [];
  warehouses:any[] = [];
  suppliers:any[] = [];
  types:any[] = [];
  supplierorderline:any[] = [];
  clientorderline:any[] = [];
  categories:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
  item!:InventoryWriteOffLineVM;
  type:any;
  inventoryItems:any[] = [];
  inventorywriteofflines:any[] = [];
  inventorywriteoffs:any[] = [];
  selectedInventory!:InventoryVM;
  reasons:any[] = [];
  //Search query 
  query:string = '';
  description!:String;

  //Modal
  displayStyle = "none";
      //Modal Open and Close Functions
    openPopup(selecteditem: InventoryWriteOffLineVM) 
    {
    this.description = this.inventorywriteofflines.find(x => x.inventoryWriteOffLineId == selecteditem.inventoryWriteOffLineId).description 
    this.displayStyle = "block";
    }

    closePopup() {
      this.displayStyle = "none";
    }

  ngOnInit(): void {
  this.selectedInventory = this.ventrixdbservice.getInventory()!;

    //Get Write Off Lines 
    this.ventrixdbservice.readInventoryWriteOffLine().subscribe(response => {
      this.inventorywriteofflines = response;

      //Get Write Off 
      this.ventrixdbservice.readInventoryWriteOff().subscribe(response => {
      this.inventorywriteoffs = response

        this.ventrixdbservice.readWriteOffReason().subscribe(response => {
        this.reasons = response;

          if (this.inventorywriteofflines.find(x => x.inventoryId == this.selectedInventory.inventoryId) != undefined)
          {
            this.inventorywriteofflines.forEach(element => {
              if (element.inventoryId == this.selectedInventory.inventoryId)
              {
                this.item = 
                {
                  inventoryWriteOffLineId: element.inventoryWriteOffLineId,
                  description: element.description,
                  date: this.inventorywriteoffs.find(x => x.inventoryWriteOffId == element.inventoryWriteOffId).date,
                  quantity: element.quantity,
                  reason: this.reasons.find(x => x.writeOffReasonId == element.writeOffReasonId).description
                }
                console.log(this.item );
                this.inventoryItems.push(this.item)
              }
            });
          } 
          else
          {
            
          Swal.fire({
            icon: 'warning',
            title: 'No Write-Offs Detected',
            confirmButtonText: 'OK',
            confirmButtonColor: '#077bff',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/write-off-inventory']).then(() => {
                window.location.reload();
              });
            }
          })  
          }
        })
      })
    })
  }

}
