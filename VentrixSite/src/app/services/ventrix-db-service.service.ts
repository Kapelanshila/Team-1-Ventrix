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
import { Securityquestion } from '../shared/SecurityQuestion';
import { Deliverystatus } from '../shared/Deliverystatus';
import { Warehouse } from '../shared/Warehouse';
import { data, param } from 'jquery';
import { WarrantyPeriod } from '../shared/WarrantyPeriod';
import { Depreciation } from '../shared/Depreciation';
import { Query } from '@angular/core';
import { AssetCategory } from '../shared/AssetCategory';
import { InventoryCategory } from '../shared/InventoryCategory';
import { WriteOffReason } from '../shared/WriteOffReason';
import { InventoryType } from '../shared/InventoryType';
import { AssetRepairReason } from '../shared/AssetRepairReason';
import { Inventory } from '../shared/Inventory';
import { InventoryVM } from '../shared/InventoryVM';
import { AssetType } from '../shared/AssetType';
import { AssetVM } from '../shared/AssetVM';
import { Account } from '../shared/Account';
import { Mail } from '../shared/Mail';
import { ClientOrder } from '../shared/ClientOrder';
import { Asset } from '../shared/Asset';
import { ClientOrderStatus } from '../shared/ClientOrderStatus';
import { ClientOrderVM } from '../shared/ClientOrderVM';
import { ClientOrderLineVM } from '../shared/ClientOrderLineVM';
import { ClientOrderLine } from '../shared/ClientOrderLine';
import { ClientResponse } from '../shared/ClientResponse';
import { SupplierOrderVM } from '../shared/SupplierOrderVM';
import { SupplierOrder } from '../shared/SupplierOrder';
import { SupplierResponse } from '../shared/SupplierResponse';
import { SupplierOrderLineVM } from '../shared/SupplierOrderLineVM';
import { InventoryWriteOff } from '../shared/InventoryWriteOff';
import { Condition } from '../shared/Condition';
import { Warranty } from '../shared/Warranty';
import { AssetRepair } from '../shared/AssetRepair';
import { AssignedAsset } from '../shared/AssignedAsset';
import { CheckOutAsset } from '../shared/CheckOutAsset';
import { CheckInAsset } from '../shared/CheckInAsset';
import { AssetWriteOff } from '../shared/AssetWriteOff';
import { AssetTrail } from '../shared/AssetTrail';
import { Timeslot } from '../shared/Timeslot';
import { TimeSlotDate } from '../shared/TimeSlotDate';
import { DeliveryTimeslot } from '../shared/DeliveryTimeslot';
import { TimeslotVM } from '../shared/TimeslotVM';
import { OrderDelivery } from '../shared/OrderDelivery';

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
      return this.http.post<any>('https://localhost:44324/api/Client/createClient',obj)
    }

    //Returns clients from API
    readClient(): Observable<Client[]> {
      return this.http.get<Client[]>('https://localhost:44324/api/Client/getClients')
    }
    
    //Updates clients from API
    updateClient(obj:any): Observable<any[]> {
      return this.http.put<any>('https://localhost:44324/api/Client/updateClient',obj)
    }

    //Deletes client from API
    deleteClient(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/Client/deleteClient',obj)
    }

    //Get Selected client so it can be either updated or deleted
    setClient(value : Client)
    {
      localStorage.setItem('Client',JSON.stringify(value ));
    }

    //Returns selected client so it can be used on potentially other pages
    getClient()
    {
      return JSON.parse(localStorage.getItem('Client')!);
    }

    //Clears selectedClient value so it ready to read again
    clearClient()
    {
      localStorage.removeItem('Client');
    }

    selectedUser: UserVM | undefined;
    //User CRUD:
    //Creates user from API
    createUser(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/VentrixUser/createVentrixUser',obj)
    }

    //Returns users from API
    readUser(): Observable<User[]> {
      return this.http.get<User[]>('https://localhost:44324/api/VentrixUser/getVentrixUser')
    }
    
    //Updates users from API
    updateUser(obj:any): Observable<any[]> {
      return this.http.put<any>('https://localhost:44324/api/VentrixUser/updateVentrixUser',obj)
    }

     //Deletes user from API
     deleteUser(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44324/api/VentrixUser/deleteVentrixUser',obj)
     }

     //Get Selected user so it can be either updated or deleted
     setUser(value : UserVM)
     {
       this.selectedUser = value;
       localStorage.setItem('User',JSON.stringify(value ));
     }

     //Returns selected user so it can be used on potentially other pages
     getUser()
     {
       return JSON.parse(localStorage.getItem('User')!);
     }

     //Clears selectedClient value so it ready to read again
     clearUser()
     {
       localStorage.removeItem('User');
     }

     //Searches User through use of the api
     searchUser(value:string){
       return this.http.get<any>('https://localhost:44324/api/VentrixUser/searchVentrixUsers?search='+value)
     }

     selectedSupplier: Supplier | undefined;
     //User CRUD:
     //Creates Supplier from API
     createSupplier(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44324/api/Supplier/createSupplier',obj)
     }

     //Returns Suppliers from API
     readSupplier(): Observable<Supplier[]> {
       return this.http.get<Supplier[]>('https://localhost:44324/api/Supplier/getSupplier')
     }
    
     //Updates Supplier from API
     updateSupplier(obj:any): Observable<any[]> {
       return this.http.put<any>('https://localhost:44324/api/Supplier/updateSupplier',obj)
     }

     //Deletes Supplier from API
     deleteSupplier(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44324/api/Supplier/deleteSupplier',obj)
     }

     //Get Selected Supplier so it can be either updated or deleted
     setSupplier(value : Supplier)
     {
      localStorage.setItem('Supplier',JSON.stringify(value ));
     }

     //Returns selected Supplier so it can be used on potentially other pages
     getSupplier()
     {
      return JSON.parse(localStorage.getItem('Supplier')!); 
     }

     //Clears selectedSupplier value so it ready to read again
     clearSupplier()
     {
      localStorage.removeItem('Supplier');
     }

     //Searches Supplier through use of the api
     searchSupplier(value:string){
      return this.http.get<any>('https://localhost:44324/api/Supplier/searchSuppliers?search='+value)
    }

      //Returns Suppliers from API
      readRole(): Observable<any[]> {
      return this.http.get<any[]>('https://localhost:44324/api/UserRole/getUserRole')
    }
        
    selectedEmployee: Employee | undefined;
    //Employee CRUD
    //Creates Employee from API
    createEmployee(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44324/api/Employee/createEmployee',obj)
    }

    //returns employees from API
    readEmployee(): Observable<Employee[]>{
      return this.http.get<Employee[]>('https://localhost:44324/api/Employee/getEmployees')
    }

    //Updates employee from API
    updateEmployee(obj:any): Observable<any[]>{
      return this.http.put<any>('https://localhost:44324/api/Employee/updateEmployee', obj)
    }

    //Deletes employee from api
    deleteEmployee(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44324/api/Employee/deleteEmployee',obj)
    }

    //Get Selected employee so it can be either updated or deleted
    setEmployee(value: Employee)
    {
      localStorage.setItem('Employee',JSON.stringify(value ));
    }

    //Returns selected client so it can be used on potentially other pages
    getEmployee()
    {
      return JSON.parse(localStorage.getItem('Employee')!);
    }

    //Clears selectedEmployee value so it ready to read again
    clearEmployee()
    {
      localStorage.removeItem('Employee');
    }

    searchEmployee(value:string){
      return this.http.get<any>('https://localhost:44324/api/Employee/searchEmployees?search='+value)
    }

    readTitle(): Observable<Employee[]>{
      return this.http.get<Employee[]>('https://localhost:44324/api/Title/getTitle')
    }

    createOtpTimer(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44324/api/OtpExpiryTime/createOtpExpiryTime',obj)
    }

    readOtpTimer(): Observable<OtpTimer[]>{
      return this.http.get<OtpTimer[]>('https://localhost:44324/api/OtpExpiryTime/getOtpExpiryTime')
    }

    updateOtpTimer(obj:any): Observable<any[]>{
      return this.http.put<any>('https://localhost:44324/api/OtpExpiryTime/updateOtpExpiryTime',obj)
    }

    deleteOtpTimer(obj:any): Observable<any[]>{
      return this.http.post<any>('https://localhost:44324/api/OtpExpiryTime/deleteOtpExpiryTime',obj)
    }

    setOtpTimer(value: OtpTimer)
    {
      localStorage.setItem('OtpTimer',JSON.stringify(value ));
    }

    getOtpTimer()
    {
      return JSON.parse(localStorage.getItem('OtpTimer')!);
    }
  
  //Searches Client through use if the api
    searchClient(value:string){
      return this.http.get<any>('https://localhost:44324/api/Client/searchClients?search='+value)
    }

    createDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/Depreciation/createDepreciation',obj)
    }

    //Returns Depreciation from API
    readDepreciation(): Observable<Depreciation[]> {
      return this.http.get<Depreciation[]>('https://localhost:44324/api/Depreciation/getDepreciation')
    }

    //Updates Depreciation from API
    updateDepreciation(obj:any): Observable<any[]> {
      return this.http.put<any>('https://localhost:44324/api/Depreciation/updateDepreciation',obj)
    }

    //Deletes Depreciation from API
    deleteDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/Depreciation/deleteDepreciation',obj)
    }

    selectedSecurityquestion: Securityquestion | undefined;
    //Security question CRUD:
    //Creates security question from API
    createSecurityquestion(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/SecurityQuestion/createSecurityquestion',obj)
    }

    //Returns security question from API
    readSecurityquestion(): Observable<Securityquestion[]> {
      return this.http.get<Securityquestion[]>('https://localhost:44324/api/SecurityQuestion/getSecurityquestion')
    }
    
    //Updates security question from API
    updateSecurityquestion(obj:any): Observable<any[]> {
      return this.http.put<any>('https://localhost:44324/api/SecurityQuestion/updateSecurityquestion',obj)
    }

    //Deletes security question from API
    deleteSecurityquestion(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/SecurityQuestion/deleteSecurityquestion',obj)
    }

    //Get Selected security question so it can be either updated or deleted
    setSecurityquestion(value : Securityquestion)
    {
      localStorage.setItem('Securityquestion',JSON.stringify(value ));
    }

    //Returns selected security question so it can be used on potentially other pages
    getSecurityquestion()
    {
      return JSON.parse(localStorage.getItem('Securityquestion')!);
    }

    //Clears selected security question value so it ready to read again
    clearSecurityquestion()
    {
      localStorage.removeItem('Securityquestion');
    }

    selectedDeliverystatus: Deliverystatus | undefined;
    //Delivery status CRUD:
    //Creates delivery status from API
    createDeliverystatus(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/DeliveryStatus/createDeliverystatus',obj)
    }

    //Returns delivery status from API
    readDeliverystatus(): Observable<Deliverystatus[]> {
      return this.http.get<Deliverystatus[]>('https://localhost:44324/api/DeliveryStatus/getDeliverystatus')
    }
    
    //Updates delivery status from API
    updateDeliverystatus(obj:any): Observable<any[]> {
      return this.http.put<any>('https://localhost:44324/api/DeliveryStatus/updateDeliverystatus',obj)
    }

    //Deletes delivery status from API
    deleteDeliverystatus(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/DeliveryStatus/deleteDeliverystatus',obj)
    }

    //Get Selected delivery status so it can be either updated or deleted
    setDeliverystatus(value : Deliverystatus)
    {
      localStorage.setItem('Deliverystatus',JSON.stringify(value ));
    }

    //Returns selected delivery status so it can be used on potentially other pages
    getDeliverystatus()
    {
      return JSON.parse(localStorage.getItem('Deliverystatus')!);
    }

    //Clears selected delivery status value so it ready to read again
    clearDeliverystatus()
    {
      localStorage.removeItem('Deliverystatus');
    }

    setDepreciation(value : Depreciation)
    {
      localStorage.setItem('Depreciation',JSON.stringify(value ));
    }

    //Returns selected client so it can be used on potentially other pages
    getDepreciation()
    {
      return JSON.parse(localStorage.getItem('Depreciation')!);
    }

    ///// Warehouse
    selectedWarehouse: Warehouse | undefined;
    
    //Creates Warehouse from API
    createWarehouse(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/Warehouse/createWarehouse',obj)
    }

    //Returns Warehouses from API
    readWarehouse(): Observable<Warehouse[]> {
      return this.http.get<Warehouse[]>('https://localhost:44324/api/Warehouse/getWarehouse')
    }
    
    //Updates Warehouse from API
    updateWarehouse(obj:any): Observable<any[]> {
      return this.http.put<any>('https://localhost:44324/api/Warehouse/updateWarehouse',obj)
    }

    //Deletes Warehouse from API
    deleteWarehouse(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/Warehouse/deleteWarehouse',obj)
    }

    //Get Selected Warehouse so it can be either updated or deleted
    setWarehouse(value : Warehouse)
    {
      localStorage.setItem('Warehouse',JSON.stringify(value ));
    }

    //Returns selected Warehouse so it can be used on potentially other pages
    getWarehouse()
    {
      return JSON.parse(localStorage.getItem('Warehouse')!);
    }

    //Clears selectedClient value so it ready to read again
    clearWarehouse()
    {
      localStorage.removeItem('Warehouse');
    }

     ///// WarrantyPeriod
     selectedWarrantyPeriod: WarrantyPeriod | undefined;
     //Client Warehouse:
     //Creates Warehouse from API
     createWarrantyPeriod(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44324/api/WarrantyPeriod/createWarrantyPeriod',obj)
     }
 
     //Returns WarrantyPeriods from API
     readWarrantyPeriod(): Observable<WarrantyPeriod[]> {
       return this.http.get<WarrantyPeriod[]>('https://localhost:44324/api/WarrantyPeriod/getWarrantyPeriod')
     }
     
     //Updates WarrantyPeriod from API
     updateWarrantyPeriod(obj:any): Observable<any[]> {
       return this.http.put<any>('https://localhost:44324/api/WarrantyPeriod/updateWarrantyPeriod',obj)
     }
 
     //Deletes WarrantyPeriod from API
     deleteWarrantyPeriod(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44324/api/WarrantyPeriod/deleteWarrantyPeriod',obj)
     }

     //Get Selected WarrantyPeriod so it can be either updated or deleted
     setWarrantyPeriod(value : WarrantyPeriod)
     {
      localStorage.setItem('WarrantyPeriod',JSON.stringify(value ));
     }
 
     //Returns selected WarrantyPeriod so it can be used on potentially other pages
     getWarrantyPeriod()
     {
      return JSON.parse(localStorage.getItem('WarrantyPeriod')!);
     }
 
     //Clears selectedWarrantyPeriod value so it ready to read again
     clearWarrantyPeriod()
     {
      localStorage.removeItem('WarrantyPeriod');
     }

     //Inventory Category 
     selectedInventoryCategory: InventoryCategory | undefined;
     createInventoryCategory(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/InventoryCategory/createInventoryCategory',obj)
    }

    //Returns Inventory Category from API
    readInventoryCategory(): Observable<InventoryCategory[]> {
      return this.http.get<InventoryCategory[]>('https://localhost:44324/api/InventoryCategory/getInventoryCategories')
    }
    
    //Updates Inventory Category  from API
    updateInventoryCategory(obj:any): Observable<any[]> {
      return this.http.put<any>('https://localhost:44324/api/InventoryCategory/updateInventoryCategory',obj)
    }

    //Deletes Inventory Category  from API
    deleteInventoryCategory(obj:any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/InventoryCategory/deleteInventoryCategory',obj)
    }

    //Search Inventory Category
    searchInventoryCategory(value:string){
      return this.http.get<any>('https://localhost:44324/api/InventoryCategory/searchInventoryCategories?search='+value)
    }     

    //Register 
     Register(obj:any): Observable<any[]> {
      return this.http.put<any>('https://localhost:44324/api/Register',obj)
      }

      //Get Selected Inventory Category so it can be either updated or deleted
      setInvetoryCategory(value : InventoryCategory)
      {
        localStorage.setItem('InventoryCategory',JSON.stringify(value ));

      }
  
      //Returns selected Inventory Category so it can be used on potentially other pages
      getInventoryCategory()
      {
       return JSON.parse(localStorage.getItem('InventoryCategory')!);
      }
  
      //Clears Inventory Category value so it ready to read again
      clearInventoryCategory()
      {
        localStorage.removeItem('InventoryCategory');
      }

      //WriteOff Reason
      selectedWriteOffReason: WriteOffReason | undefined;
      createWriteOffReason(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44324/api/WriteOffReason/createWriteOffReason',obj)
     }
 
     //Returns Write Off Reason from API
     readWriteOffReason(): Observable<InventoryCategory[]> {
       return this.http.get<InventoryCategory[]>('https://localhost:44324/api/WriteOffReason/getWriteOffReason')
     }
     
     //Updates Write Off Reason  from API
     updateWriteReason(obj:any): Observable<any[]> {
       return this.http.put<any>('https://localhost:44324/api/WriteOffReason/updateWriteOffReason',obj)
     }
 
     //Deletes Write Off Reason from API
     deleteWriteReason(obj:any): Observable<any[]> {
       return this.http.post<any>('https://localhost:44324/api/WriteOffReason/deleteWriteOffReason',obj)
     }

       //Get SelectedWrite Off Reason so it can be either updated or deleted
       setWriteOffReason(value : WriteOffReason)
       {
        localStorage.setItem('WriteOffReason',JSON.stringify(value ));
       }
   
       //Returns selected Write Off Reason so it can be used on potentially other pages
       getWriteReason()
       {
        return JSON.parse(localStorage.getItem('WriteOffReason')!);
       }
   
       //Clears Write Off Reason value so it ready to read again
       clearWriteOffReason()
       {
        localStorage.removeItem('WriteOffReason');
       }

         //Inventory Type
         selectedInventoryType: InventoryType | undefined;
         createInventoryType(obj:any): Observable<any[]> {
         return this.http.post<any>('https://localhost:44324/api/InventoryType/createInventoryType',obj)
       }
   
       //Returns Inventory Typefrom API
       readInventoryType(): Observable<InventoryType[]> {
         return this.http.get<InventoryType[]>('https://localhost:44324/api/InventoryType/getInventoryType')
       }
       
       //Updates Inventory Type from API
       updateInventoryType(obj:any): Observable<any[]> {
         return this.http.put<any>('https://localhost:44324/api/InventoryType/updateInventoryType',obj)
       }
   
       //Deletes Inventory Type Reason from API
       deleteInventoryType(obj:any): Observable<any[]> {
         return this.http.post<any>('https://localhost:44324/api/InventoryType/deleteInventoryType',obj)
       }

         //Get Selected Inventory Type so it can be either updated or deleted
         setInventoryType(value : InventoryType)
         {
          localStorage.setItem('InventoryType',JSON.stringify(value ));
         }
     
         //Returns selected Inventory Type so it can be used on potentially other pages
         getInventoryType()
         {
          return JSON.parse(localStorage.getItem('InventoryType')!);
         }
     
         //Clears Inventory Type value so it ready to read again
         clearInventoryType()
         {
          localStorage.removeItem('InventoryType');
         } 

      //Asset Repair Reason
        selectedAssetRepairReason: AssetRepairReason | undefined;
        createAssetRepairReason(obj:any): Observable<any[]> {
        return this.http.post<any>('https://localhost:44324/api/AssetRepairReason/createAssetRepairReason',obj)
      }
  
      //Returns Asset Repair Reason from API
      readAssetRepairReason(): Observable<AssetRepairReason[]> {
        return this.http.get<AssetRepairReason[]>('https://localhost:44324/api/AssetRepairReason/getAssetRepairReason')
      }
      
      //Updates Asset Repair Reason from APIv
      updateAssetRepairReason(obj:any): Observable<any[]> {
        return this.http.put<any>('https://localhost:44324/api/AssetRepairReason/updateAssetRepairReason',obj)
      }
  
      //Deletes Asset Repair Reason Reason from API
      deleteAssetRepairReason(obj:any): Observable<any[]> {
        return this.http.post<any>('https://localhost:44324/api/AssetRepairReason/deleteAssetRepairReason',obj)
      }

        //Get Selected Asset Repair Reason so it can be either updated or deleted
        setAssetRepairReason(value : AssetRepairReason)
        {
          localStorage.setItem('AssetRepairReason',JSON.stringify(value ));
        }
    
        //Returns selected Asset Repair Reason so it can be used on potentially other pages
        getAssetRepairReason()
        {
          return JSON.parse(localStorage.getItem('AssetRepairReason')!);
        }
    
        //Clears Asset Repair Reason value so it ready to read again
        clearAssetRepairReason()
        {
          localStorage.removeItem('AssetRepairReason');
        } 

        //Inventory 
        selectedInventory: InventoryVM | undefined;
        createInventory(obj:any): Observable<any[]> {
        return this.http.post<any>('https://localhost:44324/api/Inventory/createInventory',obj)
      }
  
      //Returns Asset Repair Reason from API
      readInventory(): Observable<Inventory[]> {
        return this.http.get<Inventory[]>('https://localhost:44324/api/Inventory/getInventories')
      }
      
      //Updates Asset Repair Reason from APIv
      updateInventory(obj:any): Observable<any[]> {
        return this.http.put<any>('https://localhost:44324/api/Inventory/updateInventory',obj)
      }
  
      //Deletes Asset Repair Reason Reason from API
      deleteInventory(obj:any): Observable<any[]> {
        return this.http.post<any>('https://localhost:44324/api/Inventory/deleteInventory',obj)
      }

        //Get Selected Asset Repair Reason so it can be either updated or deleted
        setInventory(value : InventoryVM)
        {
          localStorage.setItem('Inventory',JSON.stringify(value ));
        }
    
        //Returns selected Asset Repair Reason so it can be used on potentially other pages
        getInventory()
        {
          return JSON.parse(localStorage.getItem('Inventory')!);
        }
    
        //Clears Asset Repair Reason value so it ready to read again
        clearInventory()
        {
          localStorage.removeItem('Inventory');
        } 

        //Search Inventory
        searchInventory(value:string){
          return this.http.get<any>('https://localhost:44324/api/Inventory/searchInventories?search='+value)
        }     
        //

        //Asset Type
        selectedAssetType: AssetType | undefined;
        createAssetType(obj:any): Observable<any[]> {
        return this.http.post<any>('https://localhost:44324/api/AssetType/createAssetType',obj)
      }
  
      //Returns Asset Typefrom API
      readAssetType(): Observable<AssetType[]> {
        return this.http.get<AssetType[]>('https://localhost:44324/api/AssetType/getAssetType')
      }
      
      //Updates Asset Type from API
      updateAssetType(obj:any): Observable<any[]> {
        return this.http.put<any>('https://localhost:44324/api/AssetType/updateAssetType',obj)
      }
  
      //Deletes Asset Type Reason from API
      deleteAssetType(obj:any): Observable<any[]> {
        return this.http.post<any>('https://localhost:44324/api/AssetType/deleteAssetType',obj)
      }

        //Get Selected Asset Type so it can be either updated or deleted
        setAssetType(value : AssetType)
        {
          localStorage.setItem('AssetType',JSON.stringify(value ));
        }
    
        //Returns selected Asset Type so it can be used on potentially other pages
        getAssetType()
        {
          return JSON.parse(localStorage.getItem('AssetType')!);
        }
    
        //Clears Asset Type value so it ready to read again
        clearAssetType()
        {
          localStorage.removeItem('AssetType');
        } 
        
    //Asset Category 
    selectedAssetCategory: AssetCategory | undefined;
    createAssetCategory(obj:any): Observable<any[]> {
     return this.http.post<any>('https://localhost:44324/api/AssetCategory/createAssetCategory',obj)
   }

   //Returns Asset Category from API
   readAssetCategory(): Observable<AssetCategory[]> {
     return this.http.get<AssetCategory[]>('https://localhost:44324/api/AssetCategory/getAssetCategories')
   }
   
   //Updates Asset Category  from API
   updateAssetCategory(obj:any): Observable<any[]> {
     return this.http.put<any>('https://localhost:44324/api/AssetCategory/updateAssetCategory',obj)
   }

   //Deletes Asset Category  from API
   deleteAssetCategory(obj:any): Observable<any[]> {
     return this.http.post<any>('https://localhost:44324/api/AssetCategory/deleteAssetCategory',obj)
   }

   //Search Asset Category
   searchAssetCategory(value:string){
     return this.http.get<any>('https://localhost:44324/api/AssetCategory/searchAssetCategories?search='+value)
   }

   //Get Selected Asset Category so it can be either updated or deleted
   setAssetCategory(value : AssetCategory)
   {
     localStorage.setItem('AssetCategory',JSON.stringify(value ));
   }

   //Returns selected Asset Category so it can be used on potentially other pages
   getAssetCategory()
   {
    return JSON.parse(localStorage.getItem('AssetCategory')!);
   }

   //Clears Asset Category value so it ready to read again
   clearAssetCategory()
   {
     localStorage.removeItem('AssetCategory');
   }

   //Asset 
   selectedAsset: AssetVM | undefined;
   createAsset(obj:any): Observable<any[]> {
   return this.http.post<any>('https://localhost:44324/api/Asset/createAsset',obj)
 }

 //Returns Asset from API
 readAsset(): Observable<Asset[]> {
   return this.http.get<Asset[]>('https://localhost:44324/api/Asset/getAssets')
 }
 
 //Updates Asset from APIv
 updateAsset(obj:any): Observable<any[]> {
   return this.http.post<any>('https://localhost:44324/api/Asset/updateAsset',obj)
 }

 //Deletes Asset from API
 deleteAsset(obj:any): Observable<any[]> {
   return this.http.post<any>('https://localhost:44324/api/Asset/deleteAsset',obj)
 }

  //Gets Asset Image
  getAssetImage(path: string){
    return this.http.get('https://localhost:44324/api/File/getAssetImage?path='+path, {responseType : 'text'})
  }

   //Get Selected Asset so it can be either updated or deleted
   setAsset(value : AssetVM)
   {
    localStorage.setItem('Asset',JSON.stringify(value));
  }

   //Returns selected Asset so it can be used on potentially other pages
   getAsset()
   {
    return JSON.parse(localStorage.getItem('Asset')!);
   }

   //Clears Asset value so it ready to read again
   clearAsset()
   {
    localStorage.removeItem('Asset');
  } 

   //Search Asset
   searchAsset(value:string){
     return this.http.get<any>('https://localhost:44324/api/Asset/searchAssets?search='+value)
   }     
   //

   //Condition 
   readCondition(): Observable<Condition[]> {
    return this.http.get<Condition[]>('https://localhost:44324/api/Asset/getCondition')
  }
   //

   //WarrantyPeriod
   readWarranty(): Observable<Warranty[]> {
    return this.http.get<Warranty[]>('https://localhost:44324/api/Asset/getWarranty')
  }
   //

   //2FA 
   //Send OTP
   sendOTP(obj:Mail){
    return this.http.get<any>('https://localhost:44324/sendOTP?OTP='+obj.OTP+'&emailaddress='+obj.email)
  }

   //Deletes Asset from API
    createUserSecurityQuestion(obj:any,email:string): Observable<any[]> {
      return this.http.post<any>('https://localhost:44324/api/UserSecurityQuestion/createUserSecurityQuestion?email='+email,obj)
    }


  selecteAccountDetails: Account | undefined;

  //Get Selected Account
  setAccount(value : Account)
  {
    localStorage.setItem('Account',JSON.stringify(value));
  }

  //Returns selected Account
  getAccount()
  {
    return JSON.parse(localStorage.getItem('Account')!);
  }

  //Clears Account
  clearAccount()
  {
    localStorage.removeItem('Account');
  } 

    //Send Details
    sendDetails(password:string, email : string){
      return this.http.get<any>('https://localhost:44324/sendDetails?password='+password+'&emailaddress='+email)
    }

    //Send Details
    sendNewDetails(password:string, email : string, oldemail: string){
      return this.http.get<any>('https://localhost:44324/sendNewDetails?password='+password+'&emailaddress='+email+'&oldemailaddress='+oldemail)
    }

  //Get Selected Account
  setEmail(email: string)
  {
    localStorage.setItem('Email',JSON.stringify(email));
  }

  //Returns selected Account
  getEmail()
  {
    return JSON.parse(localStorage.getItem('Email')!);
  }

  //Clears Account
  clearEmail()
  {
    localStorage.removeItem('Email');
  } 
   //

   //Validate User for Register
   validUser(password:string, email : string){
    return this.http.get<any>('https://localhost:44324/api/Register/validUser?password='+password+'&emailaddress='+email)
  }

  //Updates Asset from APIv
  resetPassword(obj:any): Observable<any[]> {
    return this.http.put<any>('https://localhost:44324/api/Employee/resetPassword',obj)
  }

    //Get Forgotten Account
    forgotUser(answer1: string, answer2:string, answer3:string, question1: Number, question2:Number, question3:Number){
    return this.http.get<any>('https://localhost:44324/api/VentrixUser/getForgottenUser?answer1='+answer1+'&answer2='+answer2+'&answer3='+answer3+'&question1='+question1+'&question2='+question2+'&question3='+question3)
  }

    //Get Selected Account
    setFile(file: string)
    {
      localStorage.setItem('File',JSON.stringify(file));
    }
  
    //Returns selected Account
    getFile()
    {
      return JSON.parse(localStorage.getItem('File')!);
  
    }
  
    //Clears Account
    clearFile()
    {
      localStorage.removeItem('File');
    } 

    //Deletes Asset from API
    dowloadFile(path:string){
      return this.http.get('https://localhost:44324/api/File/getClientOrderFile?path='+path, {responseType : 'blob'})
    }
    
    //Deletes Asset from API
    dowloadSupplierFile(path:string){
      return this.http.get('https://localhost:44324/api/File/getSupplierOrderFile?path='+path, {responseType : 'blob'})
    }

  //Client Order 
   selectedClientOrder: ClientOrderVM | undefined;
   createClientOrder(obj:any): Observable<any[]> {
   return this.http.post<any>('https://localhost:44324/api/ClientOrder/createClientOrder',obj)
  }

 //Returns ClientOrder from API
 readClientOrder(): Observable<ClientOrder[]> {
   return this.http.get<ClientOrder[]>('https://localhost:44324/api/ClientOrder/getClientOrders')
 }
 
 //Updates ClientOrder from APIv
 updateClientOrder(obj:any): Observable<any[]> {
   return this.http.put<any>('https://localhost:44324/api/ClientOrder/updateClientOrder',obj)
 }

 //Deletes ClientOrder from API
 deleteClientOrder(obj:any): Observable<any[]> {
   return this.http.post<any>('https://localhost:44324/api/ClientOrder/deleteClientOrder',obj)
 }

   //Get Selected ClientOrder so it can be either updated or deleted
   setClientOrder(value : ClientOrderVM)
   {
    localStorage.setItem('ClientOrder',JSON.stringify(value));
  }

   //Returns selected ClientOrder so it can be used on potentially other pages
   getClientOrder()
   {
    return JSON.parse(localStorage.getItem('ClientOrder')!);
  }

   //Clears ClientOrder value so it ready to read again
   clearClientOrder()
   {
    localStorage.removeItem('ClientOrder');
  } 

   //Search ClientOrder
   searchClientOrder(value:string){
     return this.http.get<any>('https://localhost:44324/api/ClientOrder/searchClientOrders?search='+value)
   }     
   //

   //Delete Client Order Invoice
   deleteClientOrderInvoice(path: string){
    return this.http.get<any>('https://localhost:44324/api/File/deleteClientOrderInvoice?path='+path)
  }
  
 //Returns ClientOrder from API
 readClientOrderStatuses(): Observable<ClientOrderStatus[]> {
  return this.http.get<ClientOrderStatus[]>('https://localhost:44324/api/ClientOrderStatus/getClientOrderStatuses')
}

//Client Order Line 
  selectedClientOrderLine: ClientOrderLineVM | undefined;
   //Create ClientOrderLine
  createClientOrderLine(response: ClientResponse) {
  return this.http.post<any>('https://localhost:44324/api/ClientOrderLine/createClientOrderLine',response)
 }
   //Read ClientOrderLine
  readClientOrderLine(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:44324/api/ClientOrderLine/getClientOrderLines')
  }

  //Update ClientOrderLine
  updateClientOrderLine(obj:any): Observable<any[]> {
    return this.http.put<any>('https://localhost:44324/api/ClientOrderLine/updateClientOrderLine',obj)
  }

  //Delete ClientOrderLine
  deleteClientOrderLine(obj:any){
    return this.http.post<any>('https://localhost:44324/api/ClientOrderLine/deleteClientOrderLine',obj)
  }
  
  //Delete ClientOrderLine
  revertStatus(obj:any){
    return this.http.post<any>('https://localhost:44324/api/ClientOrderLine/revertStatus',obj)
  }

 //Supplier Order 
 selectedSupplierOrder: SupplierOrderVM | undefined;
 createSupplierOrder(obj:any): Observable<any[]> {
 return this.http.post<any>('https://localhost:44324/api/SupplierOrder/createSupplierOrder',obj)
}

//Returns SupplierOrder from API
readSupplierOrder(): Observable<SupplierOrder[]> {
 return this.http.get<SupplierOrder[]>('https://localhost:44324/api/SupplierOrder/getSupplierOrders')
}

//Updates SupplierOrder from APIv
updateSupplierOrder(obj:any): Observable<any[]> {
 return this.http.put<any>('https://localhost:44324/api/SupplierOrder/updateSupplierOrder',obj)
}

//Deletes SupplierOrder from API
deleteSupplierOrder(obj:any): Observable<any[]> {
 return this.http.post<any>('https://localhost:44324/api/SupplierOrder/deleteSupplierOrder',obj)
}

 //Get Selected SupplierOrder so it can be either updated or deleted
 setSupplierOrder(value : SupplierOrderVM)
 {
  localStorage.setItem('SupplierOrder',JSON.stringify(value));
}

 //Returns selected SupplierOrder so it can be used on potentially other pages
 getSupplierOrder()
 {
  return JSON.parse(localStorage.getItem('SupplierOrder')!);
}

 //Clears SupplierOrder value so it ready to read again
 clearSupplierOrder()
 {
  localStorage.removeItem('SupplierOrder');
} 

 //Search SupplierOrder
 searchSupplierOrder(value:string){
   return this.http.get<any>('https://localhost:44324/api/SupplierOrder/searchSupplierOrders'+value)
 }     
 //

 //Delete Supplier Order Invoice
 deleteSupplierOrderInvoice(path: string){
  return this.http.get<any>('https://localhost:44324/api/File/deleteSupplierOrderInvoice?path='+path)
}

//Supplier Order Line 
selectedSupplierOrderLine: SupplierOrderLineVM | undefined;
//Create SupplierOrderLine
createSupplierOrderLine(response: SupplierResponse) {
return this.http.post<any>('https://localhost:44324/api/SupplierOrderLine/createSupplierOrderLine',response)
}
//Read SupplierOrderLine
readSupplierOrderLine(): Observable<any[]> {
 return this.http.get<any[]>('https://localhost:44324/api/SupplierOrderLine/getSupplierOrderLines')
}

//Update SupplierOrderLine
updateSupplierOrderLine(obj:any): Observable<any[]> {
 return this.http.put<any>('https://localhost:44324/api/SupplierOrderLine/updateSupplierOrderLine',obj)
}

//Delete SupplierOrderLine
deleteSupplierOrderLine(obj:any){
 return this.http.post<any>('https://localhost:44324/api/SupplierOrderLine/deleteSupplierOrderLine',obj)
}

//Creates PDF for Specific Client Order
createOrderPDF(obj:any){
  return this.http.post<any>('https://localhost:44324/api/pdfcreator',obj, {responseType: 'blob' as 'json'})
 }


//Essentially add "Packed" status
packOrder(obj:any){
  return this.http.post<any>('https://localhost:44324/api/PackOrder/packOrder',obj)
 }

 //Reverts changes by deleting status
revertPackOrder(obj:any){
  return this.http.post<any>('https://localhost:44324/api/PackOrder/revertPackOrder',obj)
}

 //Create Write Off
 createWriteOff(obj:any){
  return this.http.post<any>('https://localhost:44324/api/InventoryWriteOff/createWriteOff',obj)
}

//readInventoryWriteOff
readInventoryWriteOff(){
  return this.http.get<any>('https://localhost:44324/api/InventoryWriteOff/getInventoryWriteOff')
}
//

//readInventoryWriteOffLine 
readInventoryWriteOffLine(){
  return this.http.get<any>('https://localhost:44324/api/InventoryWriteOff/getInventoryWriteOffLines')
}

 //Get Selected InventoryWriteOff so it can be either updated or deleted
 setInventoryWriteOff(value : InventoryWriteOff)
 {
  localStorage.setItem('InventoryWriteOff',JSON.stringify(value));
}

 //Returns selected InventoryWriteOff so it can be used on potentially other pages
 getInventoryWriteOff()
 {
  return JSON.parse(localStorage.getItem('InventoryWriteOff')!);
}

 //Clears InventoryWriteOff value so it ready to read again
 clearInventoryWriteOff()
 {
  localStorage.removeItem('InventoryWriteOff');
} 

updateInventoryStock(obj:any){
  return this.http.post<any>('https://localhost:44324/api/StockTake/updateInventoryStock',obj)
}

   //Delete Asset Image
   deleteAssetImage(path: string){
    return this.http.get<any>('https://localhost:44324/api/File/deleteAssetImage?path='+path)
  }

//Asset Repairs 
selectedAssetRepair: AssetRepair | undefined;
 createAssetRepair(obj:any): Observable<any[]> {
 return this.http.post<any>('https://localhost:44324/api/AssetRepair/createAssetRepair',obj)
}

//Returns AssetRepair from API
readAssetRepair(): Observable<AssetRepair[]> {
 return this.http.get<AssetRepair[]>('https://localhost:44324/api/AssetRepair/getAssetRepairs')
}

  //Updates AssetRepair from APIv
  updateAssetRepair(obj:any): Observable<any[]> {
  return this.http.put<any>('https://localhost:44324/api/AssetRepair/updateAssetRepair',obj)
  }

  //Deletes AssetRepair from API
  deleteAssetRepair(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/AssetRepair/deleteAssetRepair',obj)
  }

 //Get Selected AssetRepair so it can be either updated or deleted
 setAssetRepair(value : AssetRepair)
 {
  localStorage.setItem('AssetRepair',JSON.stringify(value));
}

 //Returns selected AssetRepair so it can be used on potentially other pages
 getAssetRepair()
 {
  return JSON.parse(localStorage.getItem('AssetRepair')!);
}

 //Clears AssetRepair value so it ready to read again
 clearAssetRepair()
 {
  localStorage.removeItem('AssetRepair');
} 

repairAsset(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/AssetRepair/repairAsset',obj)
 }
 
undoRepair(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/AssetRepair/undoRepair',obj)
 }

//Assigned Asset 
readAssignedAssets(): Observable<AssignedAsset[]> {
  return this.http.get<AssignedAsset[]>('https://localhost:44324/api/AssignAsset/getAssignedAssets')
 }

createAssigned(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/AssignAsset/createAssignedAsset',obj)
 }
 
undoAssignment(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/AssignAsset/undoAssignment',obj)
 }

 searchAssignment(value:string){
  return this.http.get<any>('https://localhost:44324/api/AssignAsset/searchAssignedAssets?search='+value)
} 

deleteAssignedAsset(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/AssignAsset/deleteAssigned',obj)
  }

//Check Out Asset 
createCheckOutAsset(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/CheckOut/createCheckOut',obj)
 }
 
 //Returns AssetRepair from API
 readCheckOutAsset(): Observable<CheckOutAsset[]> {
  return this.http.get<CheckOutAsset[]>('https://localhost:44324/api/CheckOut/getCheckOuts')
 }

 searchCheckOut(value:string){
  return this.http.get<any>('https://localhost:44324/api/CheckOut/searchCheckOut?search='+value)
}  

deleteCheckOutDocument(path: string){
  return this.http.get<any>('https://localhost:44324/api/File/deleteCheckOutDocument?path='+path)
}

getCheckOutDocument(path: string){
  return this.http.get('https://localhost:44324/api/File/getCheckOutDocument?path='+path, {responseType : 'blob'}) 
}

//Check In Asset 
createCheckInAsset(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/CheckIn/createCheckIn',obj)
 }
 
 //Returns AssetRepair from API
 readCheckInAsset(): Observable<CheckInAsset[]> {
  return this.http.get<CheckInAsset[]>('https://localhost:44324/api/CheckIn/getCheckIns')
 }

 searchCheckIn(value:string){
  return this.http.get<any>('https://localhost:44324/api/CheckIn/searchCheckIn?search='+value)
}  

deleteCheckInDocument(path: string){
  return this.http.get<any>('https://localhost:44324/api/File/deleteCheckInDocument?path='+path)
}

getCheckInDocument(path: string){
  return this.http.get('https://localhost:44324/api/File/getCheckInDocument?path='+path, {responseType : 'blob'}) 
}

//Asset History Location 
readAssetLocations(obj:any){
  return this.http.post<any>('https://localhost:44324/api/Asset/getLocations', obj)
}

//Asset Write Off 
createAssetWriteOff(obj:any){
  return this.http.post<any>('https://localhost:44324/api/AssetWriteOff/createWriteOff', obj)
}

deleteAssetWriteOff(obj:any){
  return this.http.post<any>('https://localhost:44324/api/AssetWriteOff/deleteWrittenOffAsset', obj)
}

readAssetWriteOff(): Observable<AssetWriteOff[]> {
  return this.http.get<AssetWriteOff[]>('https://localhost:44324/api/AssetWriteOff/getAssetWriteOff')
 }

searchAssetWriteOff(value:string){
  return this.http.get<any>('https://localhost:44324/api/AssetWriteOff/searchAssetWriteOff?search='+value)
}

//Asset Trails 
readAssetTrails(): Observable<AssetTrail[]> {
  return this.http.get<AssetTrail[]>('https://localhost:44324/api/Asset/getAssetTrails')
 }

 searchAssetTrails(value:string){
  return this.http.get<any>('https://localhost:44324/api/Asset/searchAssetTrails?search='+value)
}

//

//Timeslots
selectedTimeslot: TimeslotVM | undefined;

readTimeslots(): Observable<Timeslot[]> {
  return this.http.get<Timeslot[]>('https://localhost:44324/api/Timeslot/getTimeslot')
 }

 createTimeslot(obj:any){
  return this.http.post<any>('https://localhost:44324/api/Timeslot/createTimeSlot', obj)
}

updateTimeslot(obj:any){
  return this.http.post<any>('https://localhost:44324/api/Timeslot/updateTimeSlot', obj)
}

deleteTimeslot(obj:any): Observable<any[]> {
  return this.http.post<any>('https://localhost:44324/api/Timeslot/deleteTimeSlot',obj)
  }

   //Get Selected AssetRepair so it can be either updated or deleted
 setTimeslot(value : TimeslotVM)
 {
  localStorage.setItem('Timeslot',JSON.stringify(value));
}

 //Returns selected Timeslot so it can be used on potentially other pages
 getTimeslot()
 {
  return JSON.parse(localStorage.getItem('Timeslot')!);
}

 //Clears Timeslot value so it ready to read again
 clearTimeslot()
 {
  localStorage.removeItem('Timeslot');
} 
//

//TimeSlotDates
readTimeslotDates(): Observable<TimeSlotDate[]> {
  return this.http.get<TimeSlotDate[]>('https://localhost:44324/api/Timeslot/getTimeSlotDate')
 }
//

//DeliveryTimeslots
readDeliveryTimeslots(): Observable<DeliveryTimeslot[]> {
  return this.http.get<DeliveryTimeslot[]>('https://localhost:44324/api/Timeslot/getDeliveryTimeslot')
 }
//
  
//Returns Order Deliveries from API
readOrderDeliveries(): Observable<OrderDelivery[]> {
return this.http.get<OrderDelivery[]>('https://localhost:44324/api/Delivery/getOrderDeliveries')
}
//


//Creates PDF for Specific Client Order
createDeliveredOrderPDF(obj:any){
  return this.http.post<any>('https://localhost:44324/api/pdfcreator/createDeliveredPDF',obj, {responseType: 'blob' as 'json'})
 }

}

