import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../shared/Client';
@Injectable({
  providedIn: 'root'
})
export class VentrixDBServiceService {

  constructor(private httpClient: HttpClient) { }

    selectedClient: Client | undefined;
    //Client CRUD:
    //Creates client from API
    createClient(obj:any): Observable<any[]> {
      return this.httpClient.post<any>('https://localhost:44317/api/Client/createClient',obj)
    }

    //Returns clients from API
    readClient(): Observable<Client[]> {
      return this.httpClient.get<Client[]>('https://localhost:44317/api/Client/getClients')
    }
    
    //Updates clients from API
    updateClient(obj:any): Observable<any[]> {
      return this.httpClient.post<any>('https://localhost:44317/api/Client/updateClient',obj)
    }

    //Deletes client from API
    deleteClient(obj:any): Observable<any[]> {
      return this.httpClient.post<any>('https://localhost:44317/api/Client/deleteClient',obj)
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



    
}
