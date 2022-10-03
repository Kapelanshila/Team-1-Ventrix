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
import { environment } from 'src/environments/environment';
import { CollectedOrder } from '../shared/CollectedOrder';

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
      return this.http.post<any>(environment.apiUrl+'Client/createClient',obj)
    }

    //Returns clients from API
    readClient(): Observable<Client[]> {
      return this.http.get<Client[]>(environment.apiUrl+'Client/getClients')
    }
    
    //Updates clients from API
    updateClient(obj:any): Observable<any[]> {
      return this.http.put<any>(environment.apiUrl+'Client/updateClient',obj)
    }

    //Deletes client from API
    deleteClient(obj:any): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'Client/deleteClient',obj)
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
      return this.http.post<any>(environment.apiUrl+'VentrixUser/createVentrixUser',obj)
    }

    //Returns users from API
    readUser(): Observable<User[]> {
      return this.http.get<User[]>(environment.apiUrl+'VentrixUser/getVentrixUser')
    }
    
    //Updates users from API
    updateUser(obj:any): Observable<any[]> {
      return this.http.put<any>(environment.apiUrl+'VentrixUser/updateVentrixUser',obj)
    }

     //Deletes user from API
     deleteUser(obj:any): Observable<any[]> {
       return this.http.post<any>(environment.apiUrl+'VentrixUser/deleteVentrixUser',obj)
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
       return this.http.get<any>(environment.apiUrl+'VentrixUser/searchVentrixUsers?search='+value)
     }

     selectedSupplier: Supplier | undefined;
     //User CRUD:
     //Creates Supplier from API
     createSupplier(obj:any): Observable<any[]> {
       return this.http.post<any>(environment.apiUrl+'Supplier/createSupplier',obj)
     }

     //Returns Suppliers from API
     readSupplier(): Observable<Supplier[]> {
       return this.http.get<Supplier[]>(environment.apiUrl+'Supplier/getSupplier')
     }
    
     //Updates Supplier from API
     updateSupplier(obj:any): Observable<any[]> {
       return this.http.put<any>(environment.apiUrl+'Supplier/updateSupplier',obj)
     }

     //Deletes Supplier from API
     deleteSupplier(obj:any): Observable<any[]> {
       return this.http.post<any>(environment.apiUrl+'Supplier/deleteSupplier',obj)
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
      return this.http.get<any>(environment.apiUrl+'Supplier/searchSuppliers?search='+value)
    }

      //Returns Suppliers from API
      readRole(): Observable<any[]> {
      return this.http.get<any[]>(environment.apiUrl+'UserRole/getUserRole')
    }
        
    selectedEmployee: Employee | undefined;
    //Employee CRUD
    //Creates Employee from API
    createEmployee(obj:any): Observable<any[]>{
      return this.http.post<any>(environment.apiUrl+'Employee/createEmployee',obj)
    }

    //returns employees from API
    readEmployee(): Observable<Employee[]>{
      return this.http.get<Employee[]>(environment.apiUrl+'Employee/getEmployees')
    }

    //Updates employee from API
    updateEmployee(obj:any): Observable<any[]>{
      return this.http.put<any>(environment.apiUrl+'Employee/updateEmployee', obj)
    }

    //Deletes employee from api
    deleteEmployee(obj:any): Observable<any[]>{
      return this.http.post<any>(environment.apiUrl+'Employee/deleteEmployee',obj)
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
      return this.http.get<any>(environment.apiUrl+'Employee/searchEmployees?search='+value)
    }

    readTitle(): Observable<Employee[]>{
      return this.http.get<Employee[]>(environment.apiUrl+'Title/getTitle')
    }

    createOtpTimer(obj:any): Observable<any[]>{
      return this.http.post<any>(environment.apiUrl+'OtpExpiryTime/createOtpExpiryTime',obj)
    }

    readOtpTimer(): Observable<OtpTimer[]>{
      return this.http.get<OtpTimer[]>(environment.apiUrl+'OtpExpiryTime/getOtpExpiryTime')
    }

    updateOtpTimer(obj:any): Observable<any[]>{
      return this.http.put<any>(environment.apiUrl+'OtpExpiryTime/updateOtpExpiryTime',obj)
    }

    deleteOtpTimer(obj:any): Observable<any[]>{
      return this.http.post<any>(environment.apiUrl+'OtpExpiryTime/deleteOtpExpiryTime',obj)
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
      return this.http.get<any>(environment.apiUrl+'Client/searchClients?search='+value)
    }

    createDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'Depreciation/createDepreciation',obj)
    }

    //Returns Depreciation from API
    readDepreciation(): Observable<Depreciation[]> {
      return this.http.get<Depreciation[]>(environment.apiUrl+'Depreciation/getDepreciation')
    }

    //Updates Depreciation from API
    updateDepreciation(obj:any): Observable<any[]> {
      return this.http.put<any>(environment.apiUrl+'Depreciation/updateDepreciation',obj)
    }

    //Deletes Depreciation from API
    deleteDepreciation(obj:any): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'Depreciation/deleteDepreciation',obj)
    }

    selectedSecurityquestion: Securityquestion | undefined;
    //Security question CRUD:
    //Creates security question from API
    createSecurityquestion(obj:any): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'SecurityQuestion/createSecurityquestion',obj)
    }

    //Returns security question from API
    readSecurityquestion(): Observable<Securityquestion[]> {
      return this.http.get<Securityquestion[]>(environment.apiUrl+'SecurityQuestion/getSecurityquestion')
    }
    
    //Updates security question from API
    updateSecurityquestion(obj:any): Observable<any[]> {
      return this.http.put<any>(environment.apiUrl+'SecurityQuestion/updateSecurityquestion',obj)
    }

    //Deletes security question from API
    deleteSecurityquestion(obj:any): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'SecurityQuestion/deleteSecurityquestion',obj)
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
      return this.http.post<any>(environment.apiUrl+'DeliveryStatus/createDeliverystatus',obj)
    }

    //Returns delivery status from API
    readDeliverystatus(): Observable<Deliverystatus[]> {
      return this.http.get<Deliverystatus[]>(environment.apiUrl+'DeliveryStatus/getDeliverystatus')
    }
    
    //Updates delivery status from API
    updateDeliverystatus(obj:any): Observable<any[]> {
      return this.http.put<any>(environment.apiUrl+'DeliveryStatus/updateDeliverystatus',obj)
    }

    //Deletes delivery status from API
    deleteDeliverystatus(obj:any): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'DeliveryStatus/deleteDeliverystatus',obj)
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
      return this.http.post<any>(environment.apiUrl+'Warehouse/createWarehouse',obj)
    }

    //Returns Warehouses from API
    readWarehouse(): Observable<Warehouse[]> {
      return this.http.get<Warehouse[]>(environment.apiUrl+'Warehouse/getWarehouse')
    }
    
    //Updates Warehouse from API
    updateWarehouse(obj:any): Observable<any[]> {
      return this.http.put<any>(environment.apiUrl+'Warehouse/updateWarehouse',obj)
    }

    //Deletes Warehouse from API
    deleteWarehouse(obj:any): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'Warehouse/deleteWarehouse',obj)
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
       return this.http.post<any>(environment.apiUrl+'WarrantyPeriod/createWarrantyPeriod',obj)
     }
 
     //Returns WarrantyPeriods from API
     readWarrantyPeriod(): Observable<WarrantyPeriod[]> {
       return this.http.get<WarrantyPeriod[]>(environment.apiUrl+'WarrantyPeriod/getWarrantyPeriod')
     }
     
     //Updates WarrantyPeriod from API
     updateWarrantyPeriod(obj:any): Observable<any[]> {
       return this.http.put<any>(environment.apiUrl+'WarrantyPeriod/updateWarrantyPeriod',obj)
     }
 
     //Deletes WarrantyPeriod from API
     deleteWarrantyPeriod(obj:any): Observable<any[]> {
       return this.http.post<any>(environment.apiUrl+'WarrantyPeriod/deleteWarrantyPeriod',obj)
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
      return this.http.post<any>(environment.apiUrl+'InventoryCategory/createInventoryCategory',obj)
    }

    //Returns Inventory Category from API
    readInventoryCategory(): Observable<InventoryCategory[]> {
      return this.http.get<InventoryCategory[]>(environment.apiUrl+'InventoryCategory/getInventoryCategories')
    }
    
    //Updates Inventory Category  from API
    updateInventoryCategory(obj:any): Observable<any[]> {
      return this.http.put<any>(environment.apiUrl+'InventoryCategory/updateInventoryCategory',obj)
    }

    //Deletes Inventory Category  from API
    deleteInventoryCategory(obj:any): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'InventoryCategory/deleteInventoryCategory',obj)
    }

    //Search Inventory Category
    searchInventoryCategory(value:string){
      return this.http.get<any>(environment.apiUrl+'InventoryCategory/searchInventoryCategories?search='+value)
    }     

    //Register 
     Register(obj:any): Observable<any[]> {
      return this.http.put<any>(environment.apiUrl+'Register',obj)
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
       return this.http.post<any>(environment.apiUrl+'WriteOffReason/createWriteOffReason',obj)
     }
 
     //Returns Write Off Reason from API
     readWriteOffReason(): Observable<InventoryCategory[]> {
       return this.http.get<InventoryCategory[]>(environment.apiUrl+'WriteOffReason/getWriteOffReason')
     }
     
     //Updates Write Off Reason  from API
     updateWriteReason(obj:any): Observable<any[]> {
       return this.http.put<any>(environment.apiUrl+'WriteOffReason/updateWriteOffReason',obj)
     }
 
     //Deletes Write Off Reason from API
     deleteWriteReason(obj:any): Observable<any[]> {
       return this.http.post<any>(environment.apiUrl+'WriteOffReason/deleteWriteOffReason',obj)
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
         return this.http.post<any>(environment.apiUrl+'InventoryType/createInventoryType',obj)
       }
   
       //Returns Inventory Typefrom API
       readInventoryType(): Observable<InventoryType[]> {
         return this.http.get<InventoryType[]>(environment.apiUrl+'InventoryType/getInventoryType')
       }
       
       //Updates Inventory Type from API
       updateInventoryType(obj:any): Observable<any[]> {
         return this.http.put<any>(environment.apiUrl+'InventoryType/updateInventoryType',obj)
       }
   
       //Deletes Inventory Type Reason from API
       deleteInventoryType(obj:any): Observable<any[]> {
         return this.http.post<any>(environment.apiUrl+'InventoryType/deleteInventoryType',obj)
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
        return this.http.post<any>(environment.apiUrl+'AssetRepairReason/createAssetRepairReason',obj)
      }
  
      //Returns Asset Repair Reason from API
      readAssetRepairReason(): Observable<AssetRepairReason[]> {
        return this.http.get<AssetRepairReason[]>(environment.apiUrl+'AssetRepairReason/getAssetRepairReason')
      }
      
      //Updates Asset Repair Reason from APIv
      updateAssetRepairReason(obj:any): Observable<any[]> {
        return this.http.put<any>(environment.apiUrl+'AssetRepairReason/updateAssetRepairReason',obj)
      }
  
      //Deletes Asset Repair Reason Reason from API
      deleteAssetRepairReason(obj:any): Observable<any[]> {
        return this.http.post<any>(environment.apiUrl+'AssetRepairReason/deleteAssetRepairReason',obj)
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
        return this.http.post<any>(environment.apiUrl+'Inventory/createInventory',obj)
      }
  
      //Returns Asset Repair Reason from API
      readInventory(): Observable<Inventory[]> {
        return this.http.get<Inventory[]>(environment.apiUrl+'Inventory/getInventories')
      }
      
      //Updates Asset Repair Reason from APIv
      updateInventory(obj:any): Observable<any[]> {
        return this.http.put<any>(environment.apiUrl+'Inventory/updateInventory',obj)
      }
  
      //Deletes Asset Repair Reason Reason from API
      deleteInventory(obj:any): Observable<any[]> {
        return this.http.post<any>(environment.apiUrl+'Inventory/deleteInventory',obj)
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
          return this.http.get<any>(environment.apiUrl+'Inventory/searchInventories?search='+value)
        }     
        //

        //Asset Type
        selectedAssetType: AssetType | undefined;
        createAssetType(obj:any): Observable<any[]> {
        return this.http.post<any>(environment.apiUrl+'AssetType/createAssetType',obj)
      }
  
      //Returns Asset Typefrom API
      readAssetType(): Observable<AssetType[]> {
        return this.http.get<AssetType[]>(environment.apiUrl+'AssetType/getAssetType')
      }
      
      //Updates Asset Type from API
      updateAssetType(obj:any): Observable<any[]> {
        return this.http.put<any>(environment.apiUrl+'AssetType/updateAssetType',obj)
      }
  
      //Deletes Asset Type Reason from API
      deleteAssetType(obj:any): Observable<any[]> {
        return this.http.post<any>(environment.apiUrl+'AssetType/deleteAssetType',obj)
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
     return this.http.post<any>(environment.apiUrl+'AssetCategory/createAssetCategory',obj)
   }

   //Returns Asset Category from API
   readAssetCategory(): Observable<AssetCategory[]> {
     return this.http.get<AssetCategory[]>(environment.apiUrl+'AssetCategory/getAssetCategories')
   }
   
   //Updates Asset Category  from API
   updateAssetCategory(obj:any): Observable<any[]> {
     return this.http.put<any>(environment.apiUrl+'AssetCategory/updateAssetCategory',obj)
   }

   //Deletes Asset Category  from API
   deleteAssetCategory(obj:any): Observable<any[]> {
     return this.http.post<any>(environment.apiUrl+'AssetCategory/deleteAssetCategory',obj)
   }

   //Search Asset Category
   searchAssetCategory(value:string){
     return this.http.get<any>(environment.apiUrl+'AssetCategory/searchAssetCategories?search='+value)
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
   return this.http.post<any>(environment.apiUrl+'Asset/createAsset',obj)
 }

 //Returns Asset from API
 readAsset(): Observable<Asset[]> {
   return this.http.get<Asset[]>(environment.apiUrl+'Asset/getAssets')
 }
 
 //Updates Asset from APIv
 updateAsset(obj:any): Observable<any[]> {
   return this.http.put<any>(environment.apiUrl+'Asset/updateAsset',obj)
 }

 //Deletes Asset from API
 deleteAsset(obj:any): Observable<any[]> {
   return this.http.post<any>(environment.apiUrl+'Asset/deleteAsset',obj)
 }

  //Gets Asset Image
  getAssetImage(path: string){
    return this.http.get(environment.apiUrl+'File/getAssetImage?path='+path, {responseType : 'text'})
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
     return this.http.get<any>(environment.apiUrl+'Asset/searchAssets?search='+value)
   }     
   //

   //Condition 
   readCondition(): Observable<Condition[]> {
    return this.http.get<Condition[]>(environment.apiUrl+'Asset/getCondition')
  }
   //

   //WarrantyPeriod
   readWarranty(): Observable<Warranty[]> {
    return this.http.get<Warranty[]>(environment.apiUrl+'Asset/getWarranty')
  }
   //

   //2FA 
   //Send OTP
   sendOTP(obj:Mail){
    return this.http.get<any>('https://localhost:44324/sendOTP?OTP='+obj.OTP+'&phonenumber='+obj.email)
  }

   //Deletes Asset from API
    createUserSecurityQuestion(obj:any,email:string): Observable<any[]> {
      return this.http.post<any>(environment.apiUrl+'UserSecurityQuestion/createUserSecurityQuestion?email='+email,obj)
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
    return this.http.get<any>(environment.apiUrl+'Register/validUser?password='+password+'&emailaddress='+email)
  }

  //Updates Asset from APIv
  resetPassword(obj:any): Observable<any[]> {
    return this.http.put<any>(environment.apiUrl+'Employee/resetPassword',obj)
  }

    //Get Forgotten Account
    forgotUser(answer1: string, answer2:string, answer3:string, question1: Number, question2:Number, question3:Number){
    return this.http.get<any>(environment.apiUrl+'VentrixUser/getForgottenUser?answer1='+answer1+'&answer2='+answer2+'&answer3='+answer3+'&question1='+question1+'&question2='+question2+'&question3='+question3)
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

    
    //Get Selected Account
    setPage(page: number)
    {
      localStorage.setItem('Page',JSON.stringify(page));
    }
  
    //Returns selected Account
    getPage()
    {
      return JSON.parse(localStorage.getItem('Page')!);
  
    }
  
    //Clears Account
    clearPage()
    {
      localStorage.removeItem('Page');
    } 

    //Deletes Asset from API
    dowloadFile(path:string){
      return this.http.get(environment.apiUrl+'File/getClientOrderFile?path='+path, {responseType : 'blob'})
    }
    
    //Deletes Asset from API
    dowloadSupplierFile(path:string){
      return this.http.get(environment.apiUrl+'File/getSupplierOrderFile?path='+path, {responseType : 'blob'})
    }

  //Client Order 
   selectedClientOrder: ClientOrderVM | undefined;
   createClientOrder(obj:any): Observable<any[]> {
   return this.http.post<any>(environment.apiUrl+'ClientOrder/createClientOrder',obj)
  }

 //Returns ClientOrder from API
 readClientOrder(): Observable<ClientOrder[]> {
   return this.http.get<ClientOrder[]>(environment.apiUrl+'ClientOrder/getClientOrders')
 }
 
 //Updates ClientOrder from APIv
 updateClientOrder(obj:any): Observable<any[]> {
   return this.http.put<any>(environment.apiUrl+'ClientOrder/updateClientOrder',obj)
 }

 //Deletes ClientOrder from API
 deleteClientOrder(obj:any): Observable<any[]> {
   return this.http.post<any>(environment.apiUrl+'ClientOrder/deleteClientOrder',obj)
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
     return this.http.get<any>(environment.apiUrl+'ClientOrder/searchClientOrders?search='+value)
   }     
   //

   //Delete Client Order Invoice
   deleteClientOrderInvoice(path: string){
    return this.http.get<any>(environment.apiUrl+'File/deleteClientOrderInvoice?path='+path)
  }
  
 //Returns ClientOrder from API
 readClientOrderStatuses(): Observable<ClientOrderStatus[]> {
  return this.http.get<ClientOrderStatus[]>(environment.apiUrl+'ClientOrderStatus/getClientOrderStatuses')
}

//Client Order Line 
  selectedClientOrderLine: ClientOrderLineVM | undefined;
   //Create ClientOrderLine
  createClientOrderLine(response: ClientResponse) {
  return this.http.post<any>(environment.apiUrl+'ClientOrderLine/createClientOrderLine',response)
 }
   //Read ClientOrderLine
  readClientOrderLine(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+'ClientOrderLine/getClientOrderLines')
  }

  //Update ClientOrderLine
  updateClientOrderLine(obj:any): Observable<any[]> {
    return this.http.put<any>(environment.apiUrl+'ClientOrderLine/updateClientOrderLine',obj)
  }

  //Delete ClientOrderLine
  deleteClientOrderLine(obj:any){
    return this.http.post<any>(environment.apiUrl+'ClientOrderLine/deleteClientOrderLine',obj)
  }
  
  //Delete ClientOrderLine
  revertStatus(obj:any){
    return this.http.post<any>(environment.apiUrl+'ClientOrderLine/revertStatus',obj)
  }

 //Supplier Order 
 selectedSupplierOrder: SupplierOrderVM | undefined;
 createSupplierOrder(obj:any): Observable<any[]> {
 return this.http.post<any>(environment.apiUrl+'SupplierOrder/createSupplierOrder',obj)
}

//Returns SupplierOrder from API
readSupplierOrder(): Observable<SupplierOrder[]> {
 return this.http.get<SupplierOrder[]>(environment.apiUrl+'SupplierOrder/getSupplierOrders')
}

//Updates SupplierOrder from APIv
updateSupplierOrder(obj:any): Observable<any[]> {
 return this.http.put<any>(environment.apiUrl+'SupplierOrder/updateSupplierOrder',obj)
}

//Deletes SupplierOrder from API
deleteSupplierOrder(obj:any): Observable<any[]> {
 return this.http.post<any>(environment.apiUrl+'SupplierOrder/deleteSupplierOrder',obj)
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
   return this.http.get<any>(environment.apiUrl+'SupplierOrder/searchSupplierOrders?search='+value)
 }     
 //

 //Delete Supplier Order Invoice
 deleteSupplierOrderInvoice(path: string){
  return this.http.get<any>(environment.apiUrl+'File/deleteSupplierOrderInvoice?path='+path)
}

//Supplier Order Line 
selectedSupplierOrderLine: SupplierOrderLineVM | undefined;
//Create SupplierOrderLine
createSupplierOrderLine(response: SupplierResponse) {
return this.http.post<any>(environment.apiUrl+'SupplierOrderLine/createSupplierOrderLine',response)
}
//Read SupplierOrderLine
readSupplierOrderLine(): Observable<any[]> {
 return this.http.get<any[]>(environment.apiUrl+'SupplierOrderLine/getSupplierOrderLines')
}

//Update SupplierOrderLine
updateSupplierOrderLine(obj:any): Observable<any[]> {
 return this.http.put<any>(environment.apiUrl+'SupplierOrderLine/updateSupplierOrderLine',obj)
}

//Delete SupplierOrderLine
deleteSupplierOrderLine(obj:any){
 return this.http.post<any>(environment.apiUrl+'SupplierOrderLine/deleteSupplierOrderLine',obj)
}

//Creates PDF for Specific Client Order
createOrderPDF(obj:any){
  return this.http.post<any>(environment.apiUrl+'pdfcreator',obj, {responseType: 'blob' as 'json'})
 }


//Essentially add "Packed" status
packOrder(obj:any){
  return this.http.post<any>(environment.apiUrl+'PackOrder/packOrder',obj)
 }

 //Reverts changes by deleting status
revertPackOrder(obj:any){
  return this.http.post<any>(environment.apiUrl+'PackOrder/revertPackOrder',obj)
}

 //Create Write Off
 createWriteOff(obj:any){
  return this.http.post<any>(environment.apiUrl+'InventoryWriteOff/createWriteOff',obj)
}

//readInventoryWriteOff
readInventoryWriteOff(){
  return this.http.get<any>(environment.apiUrl+'InventoryWriteOff/getInventoryWriteOff')
}
//

//readInventoryWriteOffLine 
readInventoryWriteOffLine(){
  return this.http.get<any>(environment.apiUrl+'InventoryWriteOff/getInventoryWriteOffLines')
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
  return this.http.post<any>(environment.apiUrl+'StockTake/updateInventoryStock',obj)
}

   //Delete Asset Image
   deleteAssetImage(path: string){
    return this.http.get<any>(environment.apiUrl+'File/deleteAssetImage?path='+path)
  }

//Asset Repairs 
selectedAssetRepair: AssetRepair | undefined;
 createAssetRepair(obj:any): Observable<any[]> {
 return this.http.post<any>(environment.apiUrl+'AssetRepair/createAssetRepair',obj)
}

//Returns AssetRepair from API
readAssetRepair(): Observable<AssetRepair[]> {
 return this.http.get<AssetRepair[]>(environment.apiUrl+'AssetRepair/getAssetRepairs')
}

  //Updates AssetRepair from APIv
  updateAssetRepair(obj:any): Observable<any[]> {
  return this.http.put<any>(environment.apiUrl+'AssetRepair/updateAssetRepair',obj)
  }

  //Deletes AssetRepair from API
  deleteAssetRepair(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'AssetRepair/deleteAssetRepair',obj)
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

//Get Collected Orders
readCollectedorders(): Observable<CollectedOrder[]> {
  return this.http.get<CollectedOrder[]>(environment.apiUrl+'Delivery/getCollectedOrdersDB')
}

 //Clears AssetRepair value so it ready to read again
 clearAssetRepair()
 {
  localStorage.removeItem('AssetRepair');
} 

repairAsset(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'AssetRepair/repairAsset',obj)
 }
 
undoRepair(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'AssetRepair/undoRepair',obj)
 }

//Assigned Asset 
readAssignedAssets(): Observable<AssignedAsset[]> {
  return this.http.get<AssignedAsset[]>(environment.apiUrl+'AssignAsset/getAssignedAssets')
 }

 readUserSecurityQuestion(): Observable<any[]> {
  return this.http.get<any[]>(environment.apiUrl+'VentrixUser/getUserSecurityQuestion')
 }


 readAssetsLocations(): Observable<any[]> {
  return this.http.get<any[]>(environment.apiUrl+'VentrixUser/getUserSecurityQuestion')
 }

createAssigned(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'AssignAsset/createAssignedAsset',obj)
 }
 
undoAssignment(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'AssignAsset/undoAssignment',obj)
 }

 searchAssignment(value:string){
  return this.http.get<any>(environment.apiUrl+'AssignAsset/searchAssignedAssets?search='+value)
} 

deleteAssignedAsset(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'AssignAsset/deleteAssigned',obj)
  }

//Check Out Asset 
createCheckOutAsset(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'CheckOut/createCheckOut',obj)
 }
 
 //Returns AssetRepair from API
 readCheckOutAsset(): Observable<CheckOutAsset[]> {
  return this.http.get<CheckOutAsset[]>(environment.apiUrl+'CheckOut/getCheckOuts')
 }

 searchCheckOut(value:string){
  return this.http.get<any>(environment.apiUrl+'CheckOut/searchCheckOut?search='+value)
}  

deleteCheckOutDocument(path: string){
  return this.http.get<any>(environment.apiUrl+'File/deleteCheckOutDocument?path='+path)
}

getCheckOutDocument(path: string){
  return this.http.get(environment.apiUrl+'File/getCheckOutDocument?path='+path, {responseType : 'blob'}) 
}

//Check In Asset 
createCheckInAsset(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'CheckIn/createCheckIn',obj)
 }
 
 //Returns AssetRepair from API
 readCheckInAsset(): Observable<CheckInAsset[]> {
  return this.http.get<CheckInAsset[]>(environment.apiUrl+'CheckIn/getCheckIns')
 }

 searchCheckIn(value:string){
  return this.http.get<any>(environment.apiUrl+'CheckIn/searchCheckIn?search='+value)
}  

deleteCheckInDocument(path: string){
  return this.http.get<any>(environment.apiUrl+'File/deleteCheckInDocument?path='+path)
}

getCheckInDocument(path: string){
  return this.http.get(environment.apiUrl+'File/getCheckInDocument?path='+path, {responseType : 'blob'}) 
}

//Asset History Location 
readAssetLocations(obj:any){
  return this.http.post<any>(environment.apiUrl+'Asset/getLocations', obj)
}

//Asset Write Off 
createAssetWriteOff(obj:any){
  return this.http.post<any>(environment.apiUrl+'AssetWriteOff/createWriteOff', obj)
}

deleteAssetWriteOff(obj:any){
  return this.http.post<any>(environment.apiUrl+'AssetWriteOff/deleteWrittenOffAsset', obj)
}

readAssetWriteOff(): Observable<AssetWriteOff[]> {
  return this.http.get<AssetWriteOff[]>(environment.apiUrl+'AssetWriteOff/getAssetWriteOff')
 }

searchAssetWriteOff(value:string){
  return this.http.get<any>(environment.apiUrl+'AssetWriteOff/searchAssetWriteOff?search='+value)
}

//Asset Trails 
readAssetTrails(): Observable<AssetTrail[]> {
  return this.http.get<AssetTrail[]>(environment.apiUrl+'Asset/getAssetTrails')
 }

 searchAssetTrails(value:string){
  return this.http.get<any>(environment.apiUrl+'Asset/searchAssetTrails?search='+value)
}

//

//Timeslots
selectedTimeslot: TimeslotVM | undefined;

readTimeslots(): Observable<Timeslot[]> {
  return this.http.get<Timeslot[]>(environment.apiUrl+'Timeslot/getTimeslot')
 }

 createTimeslot(obj:any){
  return this.http.post<any>(environment.apiUrl+'Timeslot/createTimeSlot', obj)
}

updateTimeslot(obj:any){
  return this.http.put<any>(environment.apiUrl+'Timeslot/updateTimeSlot', obj)
}

deleteTimeslot(obj:any): Observable<any[]> {
  return this.http.post<any>(environment.apiUrl+'Timeslot/deleteTimeSlot',obj)
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
  return this.http.get<TimeSlotDate[]>(environment.apiUrl+'Timeslot/getTimeSlotDate')
 }
//

//DeliveryTimeslots
readDeliveryTimeslots(): Observable<DeliveryTimeslot[]> {
  return this.http.get<DeliveryTimeslot[]>(environment.apiUrl+'Timeslot/getDeliveryTimeslot')
 }
//
  
//Returns Order Deliveries from API
readOrderDeliveries(): Observable<OrderDelivery[]> {
return this.http.get<OrderDelivery[]>(environment.apiUrl+'Delivery/getOrderDeliveries')
}
//


//Creates PDF for Specific Client Order
createDeliveredOrderPDF(obj:any){
  return this.http.post<any>(environment.apiUrl+'pdfcreator/createDeliveredPDF',obj, {responseType: 'blob' as 'json'})
 }
 //

 //Backup Database
 backupDatabase(){
  return this.http.get(environment.apiUrl+'BackupRestore/Backup', { responseType : 'text'})
}
 //

 //Restore Database 
 restoreDatabase(){
  return this.http.get(environment.apiUrl+'BackupRestore/Restore', { responseType : 'text'})
}
 //

 //Backup System Files 
 backupDrive(){
  return this.http.get(environment.apiUrl+'BackupRestore/BackupDrive', { responseType : 'text'})
}
 //

  //Export Inventory Report
  generateExcelInventoryReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'ExcelSpreadsheet/createInventoryReport',obj,  {responseType: 'blob' as 'json'})
   }
   //


  //Export Asset Report
  generateExcelAssetReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'ExcelSpreadsheet/CreateAssetReport',obj,  {responseType: 'blob' as 'json'})
   }
   //

     //Export Employee Report
  generateExcelEmployeeReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'ExcelSpreadsheet/CreateEmployeeReport',obj,  {responseType: 'blob' as 'json'})
   }
   //

  //Export Depreciation Report
  generateExcelDepreciationReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'ExcelSpreadsheet/CreateDepreciationReport',obj,  {responseType: 'blob' as 'json'})
   }
   //

   
  //Export Demand Report
  generateExcelDemandReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'ExcelSpreadsheet/CreateDemandReport',obj,  {responseType: 'blob' as 'json'})
   }
   //


    //Export Demand Report
  generateExcelSupplyReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'ExcelSpreadsheet/CreateSupplyReport',obj,  {responseType: 'blob' as 'json'})
   }
   //
   

       //Export Demand Report
  generateExcelManagementReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'ExcelSpreadsheet/CreateManagementReport',obj,  {responseType: 'blob' as 'json'})
   }
   //

   //Export Inventory Stock Take 
  
   exportInventoryStockTake(obj:any){
    return this.http.post<any>(environment.apiUrl+'ExcelSpreadsheet/exportInventoryStockTake',obj,  {responseType: 'blob' as 'json'})
   }
   //

   //Reporting 
   generateInventoryPDFReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'pdfcreator/createInventoryReportPDF',obj,  {responseType: 'blob' as 'json'})
   }

   generateAssetPDFReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'pdfcreator/createAssetReportPDF',obj,  {responseType: 'blob' as 'json'})
   }

   generateEmployeePDFReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'pdfcreator/createEmployeeReportPDF',obj,  {responseType: 'blob' as 'json'})
   }

   generateSupplyPDFReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'pdfcreator/createSupplyReportPDF',obj,  {responseType: 'blob' as 'json'})
   }

   generateDemandPDFReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'pdfcreator/createDemandReportPDF',obj,  {responseType: 'blob' as 'json'})
   }
   
   generateDepreciationPDFReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'pdfcreator/createDepreciationReportPDF',obj,  {responseType: 'blob' as 'json'})
   }

   generateManagmenetPDFReport(obj:any){
    return this.http.post<any>(environment.apiUrl+'pdfcreator/createManagementReportPDF',obj,  {responseType: 'blob' as 'json'})
   }
   //
}

