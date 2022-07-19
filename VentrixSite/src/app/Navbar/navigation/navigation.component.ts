import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private ventrixdbservice:VentrixDBServiceService) { }

  ngOnInit(): void {

  }

  logout()
  {
    this.ventrixdbservice.clearInventoryCategory();
    this.authenticationService.logout();
  }

}
