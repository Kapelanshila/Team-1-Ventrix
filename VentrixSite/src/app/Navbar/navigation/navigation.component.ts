import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { PathService } from 'src/app/services/path-service.service';
import { VentrixDBServiceService } from 'src/app/services/ventrix-db-service.service';
import { Location } from '@angular/common';
import { Account } from 'src/app/shared/Account';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  account!:Account;
  constructor(private authenticationService:AuthenticationService,private ventrixdbservice:VentrixDBServiceService,  private router: Router, private pathService: PathService, private location: Location) { }

  ngOnInit(): void 
  {
    this.account = this.ventrixdbservice.getAccount();
  }

  back()
  {
    this.location.back();
  }

  logout()
  {
    this.ventrixdbservice.clearInventoryCategory();
    this.authenticationService.logout();
  }

  clientorder()
  {
    if(this.account.role == 'Driver')
    {
      this.router.navigate(['/completed-orders']);
    }
    else
    {
      this.router.navigate(['/read-clientorder']);
    }
  }

}
