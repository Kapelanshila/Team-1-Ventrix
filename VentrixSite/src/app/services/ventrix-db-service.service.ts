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
import { param } from 'jquery';
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
import { Register } from '../shared/Register';
import { Mail } from '../shared/Mail';
import { UserSecurityVM } from '../shared/UserSecurityVM';

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
      return this.http.get<any>('https://localhost:44324/api/Supplier/searchSuppliers?search='+value)
    }

      //Returns Suppliers from API
      readRole(): Observable<Supplier[]> {
      return this.http.get<Supplier[]>('https://localhost:44324/api/UserRole/getUserRole')
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
      this.otpTimerValue = value;
    }

    getOtpTimer()
    {
      return this.otpTimerValue;
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
      return this.http.post<any>('https://localhost:44324/api/Register',obj)
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
         this.selectedWriteOffReason = value;
       }
   
       //Returns selected Write Off Reason so it can be used on potentially other pages
       getWriteReason()
       {
         return this.selectedWriteOffReason;
       }
   
       //Clears Write Off Reason value so it ready to read again
       clearWriteOffReason()
       {
         this.selectedWriteOffReason = undefined;
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
           this.selectedInventoryType = value;
         }
     
         //Returns selected Inventory Type so it can be used on potentially other pages
         getInventoryType()
         {
           return this.selectedInventoryType;
         }
     
         //Clears Inventory Type value so it ready to read again
         clearInventoryType()
         {
           this.selectedInventoryType = undefined;
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
          this.selectedAssetRepairReason = value;
        }
    
        //Returns selected Asset Repair Reason so it can be used on potentially other pages
        getAssetRepairReason()
        {
          return this.selectedAssetRepairReason;
        }
    
        //Clears Asset Repair Reason value so it ready to read again
        clearAssetRepairReason()
        {
          this.selectedAssetRepairReason = undefined;
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
          this.selectedInventory = value;
        }
    
        //Returns selected Asset Repair Reason so it can be used on potentially other pages
        getInventory()
        {
          return this.selectedInventory;
        }
    
        //Clears Asset Repair Reason value so it ready to read again
        clearInventor()
        {
          this.selectedAssetRepairReason = undefined;
        } 

        //Search Inventory
        searchInventory(value:string){
          return this.http.get<any>('https://localhost:44324/api/Inventory/searchInventories?search='+value)
        }     
        //

        //Suplier Order Line
        readSupplierOrderLine(): Observable<Inventory[]> {
          return this.http.get<Inventory[]>('https://localhost:44324/api/Inventory/getSupplierOrderLines')
        }
        //

        //Client Order Line 
        readClientOrderLine(): Observable<Inventory[]> {
          return this.http.get<Inventory[]>('https://localhost:44324/api/Inventory/getClientOrderLines')
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
          this.selectedAssetType = value;
        }
    
        //Returns selected Asset Type so it can be used on potentially other pages
        getAssetType()
        {
          return this.selectedAssetType;
        }
    
        //Clears Asset Type value so it ready to read again
        clearAssetType()
        {
          this.selectedAssetType = undefined;
        } 
        
        
    //  //Asset Category 
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
 readAsset(): Observable<Inventory[]> {
   return this.http.get<Inventory[]>('https://localhost:44324/api/Asset/getAssets')
 }
 
 //Updates Asset from APIv
 updateAsset(obj:any): Observable<any[]> {
   return this.http.put<any>('https://localhost:44324/api/Asset/updateAsset',obj)
 }

 //Deletes Asset from API
 deleteAsset(obj:any): Observable<any[]> {
   return this.http.post<any>('https://localhost:44324/api/Asset/deleteAsset',obj)
 }

   //Get Selected Asset so it can be either updated or deleted
   setAsset(value : AssetVM)
   {
     this.selectedAsset = value;
   }

   //Returns selected Asset so it can be used on potentially other pages
   getAsset()
   {
     return this.selectedAsset;
   }

   //Clears Asset value so it ready to read again
   clearAsset()
   {
     this.selectedAsset = undefined;
   } 

   //Search Asset
   searchAsset(value:string){
     return this.http.get<any>('https://localhost:44324/api/Asset/searchAssets?search='+value)
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


  selecteAccountDetails: Register | undefined;

  //Get Selected Account
  setAccount(value : Register)
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
   //

  //User Security Question
  readUserSecurityQuestion(): Observable<UserSecurityVM[]> {
    return this.http.get<UserSecurityVM[]>('https://localhost:44324/api/UserSecurityQuestion/getUserSecurityQuestion')
  }
  //
  }

