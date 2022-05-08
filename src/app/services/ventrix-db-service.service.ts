import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../shared/Client';
import { Employee } from '../shared/Employee';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
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


    selectedEmployee: Employee | undefined;
    //Employee CRUD
    //Creates Employee from API
    createEmployee(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44317/api/Employee/createEmployee',obj)
    }

    //returns employees from API
    readEmployee(): Observable<Employee[]>{
      return this.http.get<Employee[]>('https://localhost:44317/api/Employee/getEmployees')
    }

    //Updates employee from API
    updateEmployee(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44317/api/Employee/updateEmployee', obj)
    }

    //Deletes employee from api
    deleteEmployee(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44317/api/Employee/deleteEmployee',obj)
    }

    //Get Selected employee so it can be either updated or deleted
    setEmployee(value: Employee)
    {
      this.selectedEmployee = value;
    }

    //Returns selected client so it can be used on potentially other pages
    getEmployee()
    {
      return this.selectedEmployee;
    }

    //Clears selectedEmployee value so it ready to read again
    clearEmployee()
    {
      this.selectedEmployee = undefined;
    }

    readTitle(): Observable<Employee[]>{
      return this.http.get<Employee[]>('https://localhost:44317/api/Employee/getTitles')
    }

}





