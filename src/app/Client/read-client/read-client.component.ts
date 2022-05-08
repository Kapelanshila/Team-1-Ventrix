import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Query } from 'src/app/shared/Query';
//Make sure swal is imported
import Swal from 'sweetalert2';


@Component({
  selector: 'app-read-client',
  templateUrl: './read-client.component.html',
  styleUrls: ['./read-client.component.css']
})
export class ReadClientComponent implements OnInit {
  clients:any[] = [];
  p: number = 1;
  config: any; 
  noOfRows = 10;
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
    this.ventrixdbservice.readClient()
    .subscribe(response => {
      this.clients = response;
      console.log(this.clients)
    })
  }

  addClient()
  {
    this.router.navigate(['/create-client']);
  }

  
  pageChange(newPage: number) {
		this.router.navigate(['/read-client'], { queryParams: { page: newPage } })
  }

  editClient(selectedclient: Client)
  {
      this.ventrixdbservice.setClient(selectedclient);
      this.router.navigate(['/update-client']);
  }

  //Delete Client Function 
  deleteClient(selectedclient: Client)
  { 
      //Sweet alerts are used as notifications
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete this client?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: '#077bff',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventrixdbservice.deleteClient(selectedclient).subscribe();
          this.router.navigate(['/read-client']).then(() => {
          window.location.reload();
          });
        }
      })  
  }

  //Searches through client first validates if there is spaace or no search was add then call api to search
  searchClient()
  {
      if (this.query == '' || this.query.replace(/\s/g, '').length == 0)
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
            this.router.navigate(['/read-client']).then(() => {
              window.location.reload();
            });
          }
        })  
      }
      else
      {
        this.ventrixdbservice.searchClient(this.query.toString()).subscribe(response => {
          this.clients = response;
          if (this.clients.length == 0)
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
              this.router.navigate(['/read-client']).then(() => {
                window.location.reload();
              });
            }
          })  
          }
          console.log(this.clients)
        })
      }  
  }
}
