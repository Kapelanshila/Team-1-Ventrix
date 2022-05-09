import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../shared/Client';
import { Securityquestion } from '../shared/Securityquestion';
import { Deliverystatus } from '../shared/Deliverystatus';
import { Warehouse } from '../shared/Warehouse';
import { param } from 'jquery';
import { WarrantyPeriod } from '../shared/WarrantyPeriod';
import { Depreciation } from '../shared/Depreciation';
import { Query } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentrixDBServiceService {

  constructor(private http: HttpClient) { }

    selectedClient: Client | undefined;
    depreciationValue: Depreciation | undefined;
    //Client CRUD:
    //Creates client from API
    createClient(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Client/createClient',obj)
    }

    //Returns clients from API
    readClient(): Observable<Client[]> {
      return this.http.get<Client[]>('https://localhost:44317/api/Client/getClients')
    }
    
    //Updates clients from API
    updateClient(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Client/updateClient',obj)
    }

    //Deletes client from API
    deleteClient(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Client/deleteClient',obj)
    }

    //Get Selected client so it can be either updated or deleted
    setClient(value : Client)
    {
      this.selectedClient = value;
    }

    //Returns selected client so it can be used on potentially other pages
    getClient()
    {
      return this.selectedClient;
    }

    //Clears selectedClient value so it ready to read again
    clearClient()
    {
      this.selectedClient = undefined;
    }
  
  //Searches Client through use if the api
    searchClient(value:string){
      return this.http.get<any>('https://localhost:44317/api/Client/searchClients?search='+value)
    }

    createDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Depreciation/createDepreciation',obj)
    }

    //Returns Depreciation from API
    readDepreciation(): Observable<Depreciation[]> {
      return this.http.get<Depreciation[]>('https://localhost:44317/api/Depreciation/getDepreciation')
    }

    //Updates Depreciation from API
    updateDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Depreciation/updateDepreciation',obj)
    }

    //Deletes Depreciation from API
    deleteDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Depreciation/deleteDepreciation',obj)
    }

    selectedSecurityquestion: Securityquestion | undefined;
    //Security question CRUD:
    //Creates security question from API
    createSecurityquestion(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/SecurityQuestion/createSecurityquestion',obj)
    }

    //Returns security question from API
    readSecurityquestion(): Observable<Securityquestion[]> {
      return this.http.get<Securityquestion[]>('https://localhost:44317/api/SecurityQuestion/getSecurityquestion')
    }
    
    //Updates security question from API
    updateSecurityquestion(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/SecurityQuestion/updateSecurityquestion',obj)
    }

    //Deletes security question from API
    deleteSecurityquestion(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/SecurityQuestion/deleteSecurityquestion',obj)
    }

    //Get Selected security question so it can be either updated or deleted
    setSecurityquestion(value : Securityquestion)
    {
      this.selectedSecurityquestion = value;
    }

    //Returns selected security question so it can be used on potentially other pages
    getSecurityquestion()
    {
      return this.selectedSecurityquestion;
    }

    //Clears selected security question value so it ready to read again
    clearSecurityquestion()
    {
      this.selectedSecurityquestion = undefined;
    }

    selectedDeliverystatus: Deliverystatus | undefined;
    //Delivery status CRUD:
    //Creates delivery status from API
    createDeliverystatus(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/DeliveryStatus/createDeliverystatus',obj)
    }

    //Returns delivery status from API
    readDeliverystatus(): Observable<Deliverystatus[]> {
      return this.http.get<Deliverystatus[]>('https://localhost:44317/api/DeliveryStatus/getDeliverystatus')
    }
    
    //Updates delivery status from API
    updateDeliverystatus(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/DeliveryStatus/updateDeliverystatus',obj)
    }

    //Deletes delivery status from API
    deleteDeliverystatus(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/DeliveryStatus/deleteDeliverystatus',obj)
    }

    //Get Selected delivery status so it can be either updated or deleted
    setDeliverystatus(value : Deliverystatus)
    {
      this.selectedDeliverystatus = value;
    }

    //Returns selected delivery status so it can be used on potentially other pages
    getDeliverystatus()
    {
      return this.selectedDeliverystatus;
    }

    //Clears selected delivery status value so it ready to read again
    clearDeliverystatus()
    {
      this.selectedDeliverystatus = undefined;
    }


    setDepreciation(value : Depreciation)
    {
      this.depreciationValue = value;
    }

    //Returns selected client so it can be used on potentially other pages
    getDepreciation()
    {
      return this.depreciationValue;
    }

    ///// Warehouse
    selectedWarehouse: Warehouse | undefined;
    
    //Creates Warehouse from API
    createWarehouse(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Warehouse/createWarehouse',obj)
    }

    //Returns Warehouses from API
    readWarehouse(): Observable<Warehouse[]> {
      return this.http.get<Warehouse[]>('https://localhost:44317/api/Warehouse/getWarehouse')
    }
    
    //Updates Warehouse from API
    updateWarehouse(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Warehouse/updateWarehouse',obj)
    }

    //Deletes Warehouse from API
    deleteWarehouse(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Warehouse/deleteWarehouse',obj)
    }

    //Get Selected Warehouse so it can be either updated or deleted
    setWarehouse(value : Warehouse)
    {
      this.selectedWarehouse = value;
    }

    //Returns selected Warehouse so it can be used on potentially other pages
    getWarehouse()
    {
      return this.selectedWarehouse;
    }

    //Clears selectedClient value so it ready to read again
    clearWarehouse()
    {
      this.selectedWarehouse = undefined;
    }

     ///// WarrantyPeriod
     selectedWarrantyPeriod: WarrantyPeriod | undefined;
     //Client Warehouse:
     //Creates Warehouse from API
     createWarrantyPeriod(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44317/api/WarrantyPeriod/createWarrantyPeriod',obj)
     }
 
     //Returns WarrantyPeriods from API
     readWarrantyPeriod(): Observable<WarrantyPeriod[]> {
       return this.http.get<WarrantyPeriod[]>('https://localhost:44317/api/WarrantyPeriod/getWarrantyPeriod')
     }
     
     //Updates WarrantyPeriod from API
     updateWarrantyPeriod(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44317/api/WarrantyPeriod/updateWarrantyPeriod',obj)
     }
 
     //Deletes WarrantyPeriod from API
     deleteWarrantyPeriod(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44317/api/WarrantyPeriod/deleteWarrantyPeriod',obj)
     }
 
     //Get Selected WarrantyPeriod so it can be either updated or deleted
     setWarrantyPeriod(value : WarrantyPeriod)
     {
       this.selectedWarrantyPeriod = value;
     }
 
     //Returns selected WarrantyPeriod so it can be used on potentially other pages
     getWarrantyPeriod()
     {
       return this.selectedWarrantyPeriod;
     }
 
     //Clears selectedWarrantyPeriod value so it ready to read again
     clearWarrantyPeriod()
     {
       this.selectedWarrantyPeriod = undefined;
     }

    }