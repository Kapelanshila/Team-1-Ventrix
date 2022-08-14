import { Component } from '@angular/core';
import { VentrixDBServiceService } from 'src/app/auth/services/ventrix-db-service.service';
import { Account } from 'src/app/shared/Account';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  account!: Account;
  constructor(private ventrixdbservice: VentrixDBServiceService) {}

  
  ngOnInit(): void {
   this.account = this.ventrixdbservice.getAccount();
  }
  
}
