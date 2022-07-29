import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadClientComponent } from './Client/read-client/read-client.component';
import { NavigationComponent } from './Navbar/navigation/navigation.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { CreateClientComponent } from './Client/create-client/create-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientUpdateComponent } from './Client/update-client/client-update.component';
import { CreateUserComponent } from './User/create-user/create-user.component';
import { ReadUserComponent } from './User/read-user/read-user.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { CreateSupplierComponent } from './Supplier/create-supplier/create-supplier.component';
import { ReadSupplierComponent } from './Supplier/read-supplier/read-supplier.component';
import { UpdateSupplierComponent } from './Supplier/update-supplier/update-supplier.component';
import { CreateEmployeeComponent } from './Employee/create-employee/create-employee.component';
import { ReadEmployeeComponent } from './Employee/read-employee/read-employee.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';
import { OtpTimerComponent } from './OTPTimer/otp-timer.component';
import { CreateSecurityquestionComponent } from './SecurityQuestion/create-securityquestion/create-securityquestion.component';
import { ReadSecurityquestionComponent } from './SecurityQuestion/read-securityquestion/read-securityquestion.component';
import { UpdateSecurityquestionComponent } from './SecurityQuestion/update-securityquestion/update-securityquestion.component';
import { CreateWarehouseComponent } from './Warehouse/create-warehouse/create-warehouse.component';
import { ReadWarehouseComponent } from './Warehouse/read-warehouse/read-warehouse.component';
import { UpdateWarehouseComponent } from './Warehouse/update-warehouse/update-warehouse.component';
import { CreatewarrantyperiodComponent } from './WarrantyPeriod/createwarrantyperiod/createwarrantyperiod.component';
import { ReadwarrantyperiodComponent } from './WarrantyPeriod/readwarrantyperiod/readwarrantyperiod.component';
import { UpdatewarrantyperiodComponent } from './WarrantyPeriod/updatewarrantyperiod/updatewarrantyperiod.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepreciationComponent } from './Depreciation/depreciation.component';
import { CreateAssetcategoryComponent } from './AssetCategory/create-assetcategory/create-assetcategory.component';
import { ReadAssetcategoryComponent } from './AssetCategory/read-assetcategory/read-assetcategory.component';
import { UpdateAssetcategoryComponent } from './AssetCategory/update-assetcategory/update-assetcategory.component';
import { CreateInventorycategoryComponent } from './InventoryCategory/create-inventorycategory/create-inventorycategory.component';
import { ReadInventorycategoryComponent } from './InventoryCategory/read-inventorycategory/read-inventorycategory.component';
import { UpdateInventorycategoryComponent } from './InventoryCategory/update-inventorycategory/update-inventorycategory.component';
import { CreateWriteoffreasonComponent } from './WriteOffReason/create-writeoffreason/create-writeoffreason.component';
import { ReadWriteoffreasonComponent } from './WriteOffReason/read-writeoffreason/read-writeoffreason.component';
import { UpdateWriteoffreasonComponent } from './WriteOffReason/update-writeoffreason/update-writeoffreason.component';
import { RegisterComponent } from './Register/register.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoginComponent } from './Login/login/login.component';
import { ReadInventoryTypeComponent } from './InventoryType/read-inventory-type/read-inventory-type.component';
import { CreateInventoryTypeComponent} from './InventoryType/create-inventory-type/create-inventory-type.component';
import { UpdateInventoryTypeComponent } from './InventoryType/update-inventory-type/update-inventory-type.component';
import { CreateAssetRepairReasonComponent } from './AssetRepairReason/create-asset-repair-reason/create-asset-repair-reason.component';
import { ReadAssetRepairReasonComponent } from './AssetRepairReason/read-asset-repair-reason/read-asset-repair-reason.component';
import { UpdateAssetRepairReasonComponent } from './AssetRepairReason/update-asset-repair-reason/update-asset-repair-reason.component';
import { CreateInventoryComponent } from './Inventory/create-inventory/create-inventory.component';
import { ReadInventoryComponent } from './Inventory/read-inventory/read-inventory.component';       
import { UpdateInventoryComponent } from './Inventory/update-inventory/update-inventory.component';                                                                               
import { ReadAssettypeComponent } from './AssetType/read-assettype/read-assettype.component';
import { CreateAssettypeComponent } from './AssetType/create-assettype/create-assettype.component';
import { UpdateAssettypeComponent } from './AssetType/update-assettype/update-assettype.component';                                                                         
import { TokenInterceptor } from './_helpers/TokenInterceptor';
import { PasswordStrengthComponent } from './PasswordStrength/password-strength.component';
import { TwoFactorAuthComponent } from './TwoFactorAuthentication/two-factor-auth.component';
import { QuestionComponent } from './Question/question.component';
import { NgOtpInputModule } from  'ng-otp-input';


// import { CreateAssetComponent } from './Assets/create-asset/create-asset.component';
// import { ReadAssetComponent } from './Assets/read-asset/read-asset.component';
// import { UpdateAssetComponent } from './Assets/update-asset/update-asset.component';
import { UpdateUserDetailsComponent } from './UpdateUserDetails/update-user-details/update-user-details.component';
import { ViewUserDetailsComponent } from './UpdateUserDetails/view-user-details/view-user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadClientComponent,
    NavigationComponent,
    DashboardComponent,
    CreateClientComponent,
    ClientUpdateComponent,
    CreateUserComponent,
    ReadUserComponent,
    UpdateUserComponent,
    CreateSupplierComponent,
    ReadSupplierComponent,
    UpdateSupplierComponent,   
    CreateEmployeeComponent,
    ReadEmployeeComponent,
    UpdateEmployeeComponent,
    OtpTimerComponent,
    CreateSecurityquestionComponent,
    ReadSecurityquestionComponent,
    UpdateSecurityquestionComponent,
    CreateWarehouseComponent,
    ReadWarehouseComponent,
    UpdateWarehouseComponent,
    CreatewarrantyperiodComponent,
    ReadwarrantyperiodComponent,
    UpdatewarrantyperiodComponent,
    DepreciationComponent,
    CreateAssetcategoryComponent,
    ReadAssetcategoryComponent,
    UpdateAssetcategoryComponent,
    CreateInventorycategoryComponent,
    ReadInventorycategoryComponent,
    UpdateInventorycategoryComponent,
    CreateWriteoffreasonComponent,
    ReadWriteoffreasonComponent,
    UpdateWriteoffreasonComponent,
    RegisterComponent,
    LoginComponent,
    ReadInventoryTypeComponent,
    CreateInventoryTypeComponent,
    UpdateInventoryTypeComponent,
    CreateAssetRepairReasonComponent,
    ReadAssetRepairReasonComponent,
    UpdateAssetRepairReasonComponent,
    ReadInventoryComponent,
    UpdateInventoryComponent,
    CreateInventoryComponent,
    ReadAssettypeComponent,
    CreateAssettypeComponent,
    UpdateAssettypeComponent,
    PasswordStrengthComponent,
    TwoFactorAuthComponent,
    QuestionComponent,
    // CreateAssetComponent,
    // ReadAssetComponent,
    // UpdateAssetComponent
    UpdateUserDetailsComponent,
    ViewUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgOtpInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
