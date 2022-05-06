import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../shared/Client';
import { DepreciationComponent } from '../Depreciation/depreciation/depreciation.component';
import { Depreciation } from '../shared/Depreciation';
@Injectable({
  providedIn: 'root'
})
export class VentrixDBServiceService {

  constructor(private http: HttpClient) { }

    selectedClient: Client | undefined;
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

    createDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Depreciation/createDepreciation',obj)
    }

    //Returns Depreciation from API
    readDepreciation(): Observable<Depreciation> {
      return this.http.get<Depreciation>('https://localhost:44317/api/Depreciation/getDepreciation')
    }
    
    //Updates Depreciation from API
    updateDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Depreciation/updateDepreciation',obj)
    }

    //Deletes Depreciation from API
    deleteDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/Depreciation/deleteDepreciation',obj)
    }

}
