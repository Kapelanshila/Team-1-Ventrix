import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../shared/Client';

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


    // selectedUser: User | undefined;
    // //User CRUD:
    // //Creates user from API
    // createUser(obj:any): Observable<any[]> {
    //   return this.http.post<any>('https://localhost:44317/api/User/createUser',obj)
    // }

    // //Returns users from API
    // readUser(): Observable<User[]> {
    //   return this.http.get<User[]>('https://localhost:44317/api/User/getUsers')
    // }
    
    // //Updates users from API
    // updateUser(obj:any): Observable<any[]> {
    //   return this.http.post<any>('https://localhost:44317/api/User/updateUser',obj)
    // }

    // //Deletes user from API
    // deleteUser(obj:any): Observable<any[]> {
    //   return this.http.post<any>('https://localhost:44317/api/User/deleteUser',obj)
    // }

    // //Get Selected user so it can be either updated or deleted
    // setUser(value : User)
    // {
    //   this.selectedUser = value;
    // }

    // //Returns selected user so it can be used on potentially other pages
    // getUser()
    // {
    //   return this.selectedUser;
    // }

    // //Clears selectedClient value so it ready to read again
    // clearUser()
    // {
    //   this.selectedUser = undefined;
    // }
}
