import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../shared/Client';
import { User } from '../shared/User';
import { Supplier } from '../shared/Supplier';
import { UserVM } from '../shared/UserVM';
import { Employee } from '../shared/Employee';
import { OtpTimer } from '../shared/OtpTimer';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
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
    otpTimerValue: OtpTimer | undefined;
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

    selectedUser: UserVM | undefined;
    //User CRUD:
    //Creates user from API
    createUser(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/User/createUser',obj)
    }

    //Returns users from API
    readUser(): Observable<User[]> {
      return this.http.get<User[]>('https://localhost:44317/api/User/getUsers')
    }
    
    //Updates users from API
    updateUser(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44317/api/User/updateUser',obj)
    }

     //Deletes user from API
     deleteUser(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44317/api/User/deleteUser',obj)
     }

     //Get Selected user so it can be either updated or deleted
     setUser(value : UserVM)
     {
       this.selectedUser = value;
     }

     //Returns selected user so it can be used on potentially other pages
     getUser()
     {
       return this.selectedUser;
     }

     //Clears selectedClient value so it ready to read again
     clearUser()
     {
       this.selectedUser = undefined;
     }

     //Searches User through use of the api
     searchUser(value:string){
       return this.http.get<any>('https://localhost:44317/api/User/searchUsers?search='+value)
     }

     selectedSupplier: Supplier | undefined;
     //User CRUD:
     //Creates Supplier from API
     createSupplier(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44317/api/Supplier/createSupplier',obj)
     }

     //Returns Suppliers from API
     readSupplier(): Observable<Supplier[]> {
       return this.http.get<Supplier[]>('https://localhost:44317/api/Supplier/getSuppliers')
     }
    
     //Updates Supplier from API
     updateSupplier(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44317/api/Supplier/updateSupplier',obj)
     }

     //Deletes Supplier from API
     deleteSupplier(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44317/api/Supplier/deleteSupplier',obj)
     }

     //Get Selected Supplier so it can be either updated or deleted
     setSupplier(value : Supplier)
     {
       this.selectedSupplier = value;
     }

     //Returns selected Supplier so it can be used on potentially other pages
     getSupplier()
     {
       return this.selectedSupplier;
     }

     //Clears selectedSupplier value so it ready to read again
     clearSupplier()
     {
       this.selectedSupplier = undefined;
     }

     //Searches Supplier through use of the api
     searchSupplier(value:string){
      return this.http.get<any>('https://localhost:44317/api/Supplier/searchSuppliers?search='+value)
    }
       //Returns Suppliers from API
       readRole(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>('https://localhost:44317/api/User/getRoles')
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

    searchEmployee(value:string){
      return this.http.get<any>('https://localhost:44317/api/Employee/searchEmployees?search='+value)
    }

    readTitle(): Observable<Employee[]>{
      return this.http.get<Employee[]>('https://localhost:44317/api/Employee/getTitles')
    }

    createOtpTimer(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44317/api/OTP/createOtpTimer',obj)
    }

    readOtpTimer(): Observable<OtpTimer[]>{
      return this.http.get<OtpTimer[]>('https://localhost:44317/api/OTP/getOtpTimer')
    }

    updateOtpTimer(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44317/api/OTP/updateOtpTimer',obj)
    }

    deleteOtpTimer(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44317/api/OTP/deleteOtpTimer',obj)
    }

    setOtpTimer(value: OtpTimer)
    {
      this.otpTimerValue = value;
    }

    getOtpTimer()
    {
      return this.otpTimerValue;
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

