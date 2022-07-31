import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientOrderStatus } from 'src/app/shared/ClientOrderStatus';
import { CollectedOrder } from 'src/app/shared/CollectedOrder';
import { OrderDelivery } from 'src/app/shared/OrderDelivery';
import { ReScheduleVM, ScheduleVM } from 'src/app/shared/Schedule';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers:
  new HttpHeaders (
  {
    "Content-Type": "application/json",
  }),

  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {

  constructor(private http: HttpClient, handler: HttpBackend, private h: HttpClient,) {this.h = new HttpClient(handler);}

  getOrdersToBeDelivered(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'Delivery/getCollectedOrders');
  }

  scheduleDelivery(schedule: ScheduleVM) {
    return this.http.post(`${environment.apiUrl}Delivery/ScheduleClientDelivery`, schedule );
  }

  getDeliveryTimeSlots(id) {
    return this.http.get<any[]>(environment.apiUrl + 'Delivery/GetDeliveryTimeSlots/'+id);
  }

  rescheduleDelivery(schedule: ReScheduleVM) {
    return this.http.post(`${environment.apiUrl}Delivery/ReScheduleClientDelivery`, schedule );
  }

  //completing the order
  getEnRouteOrders(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'Delivery/getEnRouteOrders');
  }

  changeDeliveryStatusEnroute(ordeId: Number) {
    return this.http.post(`${environment.apiUrl}Delivery/ChangeDeliveryStatusEnroute?orderId=${ordeId}`, {} );
  }

  completeDelivery(obj:any) {
    return this.http.post(`${environment.apiUrl}Delivery/CompleteDelivery`,obj);
  }
  //https://localhost:44324/api/Delivery/CompleteDelivery



//Returns ClientOrder from API
 readClientOrderStatuses(): Observable<ClientOrderStatus[]> {
  return this.http.get<ClientOrderStatus[]>(environment.apiUrl+'ClientOrderStatus/getClientOrderStatuses')
}
//

//Read Collected Order from API 
readCollectedorders(): Observable<CollectedOrder[]> {
  return this.http.get<CollectedOrder[]>(environment.apiUrl+'Delivery/getCollectedOrdersDB')
}
//

//Returns Order Deliveries from API
readOrderDeliveries(): Observable<OrderDelivery[]> {
  return this.http.get<OrderDelivery[]>(environment.apiUrl+'Delivery/getOrderDeliveries')
  }
  //

 //Search Client Order
 searchClientOrder(value: string){
  return this.http.get<any>(environment.apiUrl+'Delivery/searchClientOrder?search='+value);
}
//

//Read Distances from Google
GoogleMaps(destinations: string){
  return this.h.get(environment.apiUrl+'Delivery/distanceMatrixRequest?Destination='+destinations)
}
//

}
