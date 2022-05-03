import { Component, OnInit } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from 'src/app/shared/Client';
import { Router } from '@angular/router';
@Component({
  selector: 'app-read-client',
  templateUrl: './read-client.component.html',
  styleUrls: ['./read-client.component.css']
})
export class ReadClientComponent implements OnInit {
  clients:any[] = [];
  constructor(private ventrixdbservice:VentrixDBServiceService, private router: Router) { }

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

  editClient(selectedclient: Client)
  {
      this.ventrixdbservice.setClient(selectedclient);
      this.router.navigate(['/update-client']);
  }

  //Delete Client Function 
  deleteClient(selectedclient: Client)
  {
    this.ventrixdbservice.deleteClient(selectedclient).subscribe();
    location.reload();
  }
}
