import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {


  constructor(private http: HttpClient) { }

  getOrderCollections(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'Delivery/getPackedOrders');
  }

  collectOrder(obj: any) {
    return this.http.post(`${environment.apiUrl}Delivery/collectOrder`, obj );
  }
}
