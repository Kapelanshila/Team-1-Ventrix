import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { VentrixDBServiceService } from '../services/ventrix-db-service.service';
import { Account } from '../shared/Account';
import { TokenStorageService } from './TokenStorageService';
@Injectable({
  providedIn: 'root'
})

export class InventoryAuthGuard implements CanActivate {
  account!:Account;
  constructor(
    private tokenStorageService: TokenStorageService,
    private ventrixDBServiceService:VentrixDBServiceService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      this.account = this.ventrixDBServiceService.getAccount();
      if (this.tokenStorageService.getToken != undefined && (this.account.role == "Admin" || this.account.role == "Master" || this.account.role == "Management" || this.account.role == "Warehouse"))
      {
        return true;
      }
      else
      {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
}
