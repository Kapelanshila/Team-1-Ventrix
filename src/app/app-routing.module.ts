import { Component, NgModule } from '@angular/core';
import { UpdatewarrantyperiodComponent } from './WarrantyPeriod/updatewarrantyperiod/updatewarrantyperiod.component';
import { ReadwarrantyperiodComponent } from './WarrantyPeriod/readwarrantyperiod/readwarrantyperiod.component';
import { CreatewarrantyperiodComponent } from './WarrantyPeriod/createwarrantyperiod/createwarrantyperiod.component';
import { UpdateWarehouseComponent } from './Warehouse/update-warehouse/update-warehouse.component';
import { ReadWarehouseComponent } from './Warehouse/read-warehouse/read-warehouse.component';
import { CreateWarehouseComponent } from './Warehouse/create-warehouse/create-warehouse.component';
import { RouterModule, Routes } from '@angular/router';
import { ReadClientComponent } from './Client/read-client/read-client.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { CreateClientComponent } from './Client/create-client/create-client.component';
import { ClientUpdateComponent } from './Client/update-client/client-update.component';
import { CreateSupplierComponent } from './Supplier/create-supplier/create-supplier.component';
import { UpdateSupplierComponent } from './Supplier/update-supplier/update-supplier.component';
import { CreateUserComponent } from './User/create-user/create-user.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { ReadUserComponent } from './User/read-user/read-user.component';
import { ReadSupplierComponent } from './Supplier/read-supplier/read-supplier.component';
import { CreateEmployeeComponent } from './Employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';
import { ReadEmployeeComponent } from './Employee/read-employee/read-employee.component';
import { CreateSecurityquestionComponent } from './SecurityQuestion/create-securityquestion/create-securityquestion.component';
import { UpdateSecurityquestionComponent } from './SecurityQuestion/update-securityquestion/update-securityquestion.component';
import { ReadSecurityquestionComponent } from './SecurityQuestion/read-securityquestion/read-securityquestion.component';
import { OtpTimerComponent } from './OTPTimer/otp-timer.component';
import { LoginComponent } from './Login/login/login.component';
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
import { ReadInventoryTypeComponent } from './InventoryType/read-inventory-type/read-inventory-type.component';
import { CreateInventoryTypeComponent } from './InventoryType/create-inventory-type/create-inventory-type.component';
import { UpdateInventoryTypeComponent } from './InventoryType/update-inventory-type/update-inventory-type.component';
import { ReadAssetRepairReasonComponent } from './AssetRepairReason/read-asset-repair-reason/read-asset-repair-reason.component';
import { CreateAssetRepairReasonComponent } from './AssetRepairReason/create-asset-repair-reason/create-asset-repair-reason.component';
import { UpdateAssetRepairReasonComponent } from './AssetRepairReason/update-asset-repair-reason/update-asset-repair-reason.component';
import { ReadInventoryComponent } from './Inventory/read-inventory/read-inventory.component';       
import { UpdateInventoryComponent } from './Inventory/update-inventory/update-inventory.component';             
import { CreateInventoryComponent } from './Inventory/create-inventory/create-inventory.component';
import { CreateAssettypeComponent } from './AssetType/create-assettype/create-assettype.component';
import { ReadAssettypeComponent } from './AssetType/read-assettype/read-assettype.component';
import { UpdateAssettypeComponent } from './AssetType/update-assettype/update-assettype.component';
import { TwoFactorAuthComponent } from './TwoFactorAuthentication/two-factor-auth.component';
import { QuestionComponent } from './Question/question.component';
// import { CreateAssetComponent } from './Assets/create-asset/create-asset.component';
// import { ReadAssetComponent } from './Assets/read-asset/read-asset.component';
// import { UpdateAssetComponent } from './Assets/update-asset/update-asset.component';

const routes: Routes = [{ path: 'app', component: AppComponent },
{ path: 'create-client', component: CreateClientComponent },
{ path: 'read-client', component: ReadClientComponent },
{ path: 'update-client', component: ClientUpdateComponent },
{ path: 'create-assetcategory', component: CreateAssetcategoryComponent },
{ path: 'read-assetcategory', component: ReadAssetcategoryComponent },
{ path: 'update-assetcategory', component: UpdateAssetcategoryComponent },
{ path: 'create-inventorycategory', component: CreateInventorycategoryComponent },
{ path: 'read-inventorycategory', component: ReadInventorycategoryComponent },
{ path: 'update-inventorycategory', component: UpdateInventorycategoryComponent },
{ path: 'create-employee', component: CreateEmployeeComponent},
{ path: 'update-employee', component: UpdateEmployeeComponent},
{ path: 'read-employee', component: ReadEmployeeComponent},
{ path: 'otp-timer', component: OtpTimerComponent},
{ path: 'dashboard', component: DashboardComponent },
{ path: 'create-supplier', component: CreateSupplierComponent },
{ path: 'update-supplier', component: UpdateSupplierComponent },
{ path: 'create-user', component: CreateUserComponent },
{ path: 'update-user', component: UpdateUserComponent },
{ path: 'read-user', component: ReadUserComponent },
{ path: 'read-supplier', component: ReadSupplierComponent },
{ path: 'create-securityquestion', component: CreateSecurityquestionComponent },
{ path: 'read-securityquestion', component: ReadSecurityquestionComponent },
{ path: 'update-securityquestion', component: UpdateSecurityquestionComponent },
{ path: 'create-warehouse', component: CreateWarehouseComponent },
{ path: 'read-warehouse', component: ReadWarehouseComponent },
{ path: 'update-warehouse', component: UpdateWarehouseComponent },
{ path: 'create-warranty-period', component: CreatewarrantyperiodComponent },
{ path: 'read-warranty-period', component: ReadwarrantyperiodComponent},
{ path: 'update-warranty-period', component: UpdatewarrantyperiodComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent },
{ path: 'depreciation', component: DepreciationComponent },
{ path: 'create-writeoffreason', component: CreateWriteoffreasonComponent},
{ path: 'read-writeoffreason', component: ReadWriteoffreasonComponent},
{ path: 'update-writeoffreason', component: UpdateWriteoffreasonComponent},
{path: 'register', component:RegisterComponent},
{path: 'read-inventorytype', component: ReadInventoryTypeComponent},
{path: 'create-inventorytype', component:CreateInventoryTypeComponent},
{path: 'update-inventorytype', component:UpdateInventoryTypeComponent},
{path: 'read-assettype', component: ReadAssettypeComponent},
{path: 'create-assettype', component:CreateAssettypeComponent},
{path: 'update-assettype', component:UpdateAssettypeComponent},
{ path: 'read-assetrepairreason', component: ReadAssetRepairReasonComponent},
{path: 'create-assetrepairreason', component:CreateAssetRepairReasonComponent},
{path: 'update-assetrepairreason', component:UpdateAssetRepairReasonComponent},
{path: 'create-inventory', component:CreateInventoryComponent},
{path: 'read-inventory', component:ReadInventoryComponent},
{path: 'update-inventory', component:UpdateInventoryComponent},
{path: '2FA', component:TwoFactorAuthComponent},
{path: 'question', component:QuestionComponent},
// {path: 'create-asset', component:CreateAssetComponent},
// {path: 'read-asset', component:ReadAssetComponent},
// {path: 'update-asset', component:UpdateAssetComponent},
{path: '', redirectTo: 'login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
