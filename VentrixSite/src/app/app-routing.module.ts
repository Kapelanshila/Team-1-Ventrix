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
import { ReadSecurityquestionComponent } from './SecurityQuestion/read-securityquestion/read-securityquestion.component';
import { UpdateSecurityquestionComponent } from './SecurityQuestion/update-securityquestion/update-securityquestion.component';
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
import { UpdateProfileComponent } from './UpdateProfile/update-profile.component';
import { CreateSupplierOrderComponent } from './SupplierOrder/create-supplier-order/create-supplier-order.component';
import { ReadSupplierOrderComponent } from './SupplierOrder/read-supplier-order/read-supplier-order.component';
import { UpdateSupplierOrderComponent } from './SupplierOrder/update-supplier-order/update-supplier-order.component';
import { CreateClientOrderComponent } from './ClientOrder/create-client-order/create-client-order.component';
import { ReadClientOrderComponent } from './ClientOrder/read-client-order/read-client-order.component';
import { UpdateClientOrderComponent } from './ClientOrder/update-client-order/update-client-order.component';
import { ReadClientOrderlineComponent } from './ClientOrderLine/ReadClientOrderLine/read-client-orderline.component';
import { UpdateClientOrderlineComponent } from './ClientOrderLine/UpdateClientOrderLine/update-client-orderline.component';
import { ReadSupplierOrderlineComponent } from './SupplierOrderLine/ReadSupplierOrderLine/read-supplier-orderline.component';
import { UpdateSupplierOrderlineComponent } from './SupplierOrderLine/UpdateSupplierOrderLine/update-supplier-orderline.component';
import { WriteOffInventoryComponent } from './WriteOffInventory/write-off-inventory.component';
import { WriteOffComponent } from './WriteOffInventory/WriteOff/write-off.component';
import { ViewWriteOffsComponent } from './WriteOffInventory/ViewWriteOffs/view-write-offs.component';
import { ReadInventoryStocktakeComponent } from './StockTake/Inventory/ReadInventoryStockTake/read-inventory-stocktake.component';
import { CreateInventoryStocktakeComponent } from './StockTake/Inventory/CreateInventoryStockTake/create-inventory-stocktake.component';
import { CreateAssetComponent } from './Assets/create-asset/create-asset.component';
import { ReadAssetComponent } from './Assets/read-asset/read-asset.component';
import { UpdateAssetComponent } from './Assets/update-asset/update-asset.component';
import { ViewAssetComponent } from './Assets/view-asset/view-asset.component';
import { AssetRepairComponent } from './AssetRepair/asset-repair.component';
import { CreateAssetRepairComponent } from './AssetRepair/CreateAssetRepair/create-asset-repair.component';
import { ReadAssetRepairComponent } from './AssetRepair/ReadAssetRepair/read-asset-repair.component';
import { UpdateAssetRepairComponent } from './AssetRepair/UpdateAssetRepair/update-asset-repair.component';
import { RevertRepairComponent } from './RevertRepair/revert-repair.component';
import { ReadAssignedAssetComponent } from './AssignedAsset/ReadAssignedAsset/read-assigned-asset.component';
import { UndoAssignedAssetComponent } from './AssignedAsset/UndoAssignedAsset/undo-assigned-asset.component';
import { ReadCheckoutComponent } from './CheckOut/ReadCheckOut/read-checkout.component';
import { ViewCheckoutsComponent } from './CheckOut/ViewCheckOut/view-checkouts.component';
import { ReadCheckinComponent } from './CheckIn/ReadCheckIn/read-checkin.component';
import { ViewCheckinComponent } from './CheckIn/ViewCheckIn/view-checkin.component';
import { ReadAssetWriteoffComponent } from './AssetWriteOff/ReadAssetWriteOff/read-asset-writeoff.component';
import { ViewAssetWriteoffComponent } from './AssetWriteOff/ViewAssetWriteOff/view-asset-writeoff.component';
import { CreateAssetWriteoffComponent } from './AssetWriteOff/CreateAssetWriteOff/create-asset-writeoff.component';
import { ReadAssettrailComponent } from './AssetTrails/ReadAssetTrail/read-assettrail.component';
import { TimeslotComponent } from './Timeslot/timeslot.component';
import { CreateTimeslotComponent } from './Timeslot/CreateTimeslot/create-timeslot.component';
import { ReadTimeslotComponent } from './Timeslot/ReadTimeslot/read-timeslot.component';
import { UpdateTimeslotComponent } from './Timeslot/UpdateTimeslot/update-timeslot.component';
import { AdminAuthGuard } from './_helpers/admin.auth.guard';
import { InventoryAuthGuard } from './_helpers/inventory.auth.guard';
import { AssetAuthGuard } from './_helpers/asset.auth.guard';
import { DriverAuthGuard } from './_helpers/driver.auth.guard';
import { GeneralAuthGuard } from './_helpers/general.auth.guard';

const routes: Routes = [{ path: 'app', component: AppComponent },
{ path: 'create-client', component: CreateClientComponent, canActivate: [AdminAuthGuard]  },
{ path: 'read-client', component: ReadClientComponent},
{ path: 'update-client', component: ClientUpdateComponent, canActivate: [AdminAuthGuard]  },
{ path: 'create-assetcategory', component: CreateAssetcategoryComponent , canActivate: [AssetAuthGuard]  },
{ path: 'read-assetcategory', component: ReadAssetcategoryComponent, canActivate: [AssetAuthGuard]  },
{ path: 'update-assetcategory', component: UpdateAssetcategoryComponent , canActivate: [AssetAuthGuard]  },
{ path: 'create-inventorycategory', component: CreateInventorycategoryComponent , canActivate: [InventoryAuthGuard]  },
{ path: 'read-inventorycategory', component: ReadInventorycategoryComponent , canActivate: [InventoryAuthGuard]  },
{ path: 'update-inventorycategory', component: UpdateInventorycategoryComponent , canActivate: [InventoryAuthGuard]  },
{ path: 'create-employee', component: CreateEmployeeComponent, canActivate: [AdminAuthGuard]  },
{ path: 'update-employee', component: UpdateEmployeeComponent, canActivate: [AdminAuthGuard]  },
{ path: 'read-employee', component: ReadEmployeeComponent, canActivate: [AdminAuthGuard]  },
{ path: 'otp-timer', component: OtpTimerComponent, canActivate: [AdminAuthGuard]  },
{ path: 'create-supplier', component: CreateSupplierComponent , canActivate: [AdminAuthGuard]  },
{ path: 'update-supplier', component: UpdateSupplierComponent , canActivate: [AdminAuthGuard]  },
{ path: 'create-user', component: CreateUserComponent , canActivate: [AdminAuthGuard]  },
{ path: 'update-user', component: UpdateUserComponent, canActivate: [AdminAuthGuard]  },
{ path: 'read-user', component: ReadUserComponent, canActivate: [AdminAuthGuard]  },
{ path: 'read-supplier', component: ReadSupplierComponent , canActivate: [AdminAuthGuard]  },
{ path: 'create-securityquestion', component: CreateSecurityquestionComponent , canActivate: [AdminAuthGuard]  },
{ path: 'read-securityquestion', component: ReadSecurityquestionComponent, canActivate: [AdminAuthGuard]  },
{ path: 'update-securityquestion', component: UpdateSecurityquestionComponent , canActivate: [AdminAuthGuard]  },
{ path: 'create-warehouse', component: CreateWarehouseComponent , canActivate: [AdminAuthGuard]  },
{ path: 'read-warehouse', component: ReadWarehouseComponent , canActivate: [AdminAuthGuard]  },
{ path: 'update-warehouse', component: UpdateWarehouseComponent , canActivate: [AdminAuthGuard]  },
{ path: 'create-warranty-period', component: CreatewarrantyperiodComponent, canActivate: [AdminAuthGuard]  },
{ path: 'read-warranty-period', component: ReadwarrantyperiodComponent, canActivate: [AdminAuthGuard]  },
{ path: 'update-warranty-period', component: UpdatewarrantyperiodComponent , canActivate: [AdminAuthGuard]  },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent },
{ path: 'depreciation', component: DepreciationComponent , canActivate: [AdminAuthGuard]  },
{ path: 'create-writeoffreason', component: CreateWriteoffreasonComponent, canActivate: [AdminAuthGuard]  },
{ path: 'read-writeoffreason', component: ReadWriteoffreasonComponent, canActivate: [AdminAuthGuard]  },
{ path: 'update-writeoffreason', component: UpdateWriteoffreasonComponent, canActivate: [AdminAuthGuard]  },
{path: 'register', component:RegisterComponent},
{path: 'read-inventorytype', component: ReadInventoryTypeComponent, canActivate: [InventoryAuthGuard]  },
{path: 'create-inventorytype', component:CreateInventoryTypeComponent, canActivate: [InventoryAuthGuard]  },
{path: 'update-inventorytype', component:UpdateInventoryTypeComponent, canActivate: [InventoryAuthGuard]  },
{path: 'read-assettype', component: ReadAssettypeComponent, canActivate: [AssetAuthGuard]  },
{path: 'create-assettype', component:CreateAssettypeComponent, canActivate: [AssetAuthGuard]  },
{path: 'update-assettype', component:UpdateAssettypeComponent, canActivate: [AssetAuthGuard]  },
{ path: 'read-assetrepairreason', component: ReadAssetRepairReasonComponent, canActivate: [AdminAuthGuard]  },
{path: 'create-assetrepairreason', component:CreateAssetRepairReasonComponent, canActivate: [AdminAuthGuard]  },
{path: 'update-assetrepairreason', component:UpdateAssetRepairReasonComponent, canActivate: [AdminAuthGuard]  },
{path: 'create-inventory', component:CreateInventoryComponent, canActivate: [InventoryAuthGuard]  },
{path: 'read-inventory', component:ReadInventoryComponent, canActivate: [InventoryAuthGuard]  },
{path: 'update-inventory', component:UpdateInventoryComponent, canActivate: [InventoryAuthGuard]  },
{path: '2FA', component:TwoFactorAuthComponent},
{path: 'question', component:QuestionComponent},
{path: 'profile', component:UpdateProfileComponent, canActivate: [GeneralAuthGuard]  },
{path: 'create-supplierorder', component:CreateSupplierOrderComponent, canActivate: [InventoryAuthGuard]  },
{path: 'read-supplierorder', component:ReadSupplierOrderComponent, canActivate: [InventoryAuthGuard]  },
{path: 'update-supplierorder', component:UpdateSupplierOrderComponent, canActivate: [InventoryAuthGuard]  },
{path: 'create-clientorder', component:CreateClientOrderComponent, canActivate: [InventoryAuthGuard]  },
{path: 'read-clientorder', component:ReadClientOrderComponent, canActivate: [InventoryAuthGuard]  },
{path: 'update-clientorder', component:UpdateClientOrderComponent, canActivate: [InventoryAuthGuard]  },
{path: 'read-clientorderline', component:ReadClientOrderlineComponent, canActivate: [InventoryAuthGuard]  },
{path: 'update-clientorderline', component:UpdateClientOrderlineComponent, canActivate: [InventoryAuthGuard]  },
{path: 'read-supplierorderline', component:ReadSupplierOrderlineComponent, canActivate: [InventoryAuthGuard]  },
{path: 'update-supplierorderline', component:UpdateSupplierOrderlineComponent, canActivate: [InventoryAuthGuard]  },
{path: 'write-off-inventory', component:WriteOffInventoryComponent, canActivate: [InventoryAuthGuard]  },
{path: 'write-off-item', component:WriteOffComponent, canActivate: [InventoryAuthGuard]  },
{path: 'view-write-offs', component:ViewWriteOffsComponent, canActivate: [InventoryAuthGuard]  },
{path: 'create-inventory-stocktake', component:CreateInventoryStocktakeComponent},
{path: 'read-inventory-stocktake', component:ReadInventoryStocktakeComponent, canActivate: [InventoryAuthGuard]  },
{path: 'create-asset', component:CreateAssetComponent, canActivate: [AssetAuthGuard]  },
{path: 'read-asset', component:ReadAssetComponent, canActivate: [AssetAuthGuard]  },
{path: 'update-asset', component:UpdateAssetComponent, canActivate: [AssetAuthGuard]  },
{path: 'view-asset', component:ViewAssetComponent, canActivate: [AssetAuthGuard]  },
{path: 'asset-repair', component:AssetRepairComponent, canActivate: [AssetAuthGuard]  },
{path: 'create-asset-repair', component:CreateAssetRepairComponent, canActivate: [AssetAuthGuard]  },
{path: 'read-asset-repair', component:ReadAssetRepairComponent, canActivate: [AssetAuthGuard]  },
{path: 'update-asset-repair', component:UpdateAssetRepairComponent, canActivate: [AssetAuthGuard]  },
{path: 'revert-repair', component:RevertRepairComponent, canActivate: [AssetAuthGuard]  },
{path: 'read-assigned-asset', component:ReadAssignedAssetComponent, canActivate: [AssetAuthGuard]  },
{path: 'undo-assigned-asset', component:UndoAssignedAssetComponent, canActivate: [AssetAuthGuard]  },
{path: 'read-checkout', component:ReadCheckoutComponent, canActivate: [AssetAuthGuard]  },
{path: 'view-checkout', component:ViewCheckoutsComponent, canActivate: [AssetAuthGuard]  },
{path: 'read-checkin', component:ReadCheckinComponent, canActivate: [AssetAuthGuard]  },
{path: 'view-checkin', component:ViewCheckinComponent, canActivate: [AssetAuthGuard]  },
{path: 'read-asset-writeoff', component:ReadAssetWriteoffComponent, canActivate: [AssetAuthGuard]  },
{path: 'create-asset-writeoff', component:CreateAssetWriteoffComponent, canActivate: [AssetAuthGuard]  },
{path: 'view-asset-writeoff', component:ViewAssetWriteoffComponent, canActivate: [AssetAuthGuard]  },
{path: 'read-asset-trail', component:ReadAssettrailComponent, canActivate: [AssetAuthGuard]  },
{path: 'create-timeslot', component:CreateTimeslotComponent, canActivate: [InventoryAuthGuard]  },
{path: 'read-timeslot', component:ReadTimeslotComponent, canActivate: [InventoryAuthGuard]  },
{path: 'update-timeslot', component:UpdateTimeslotComponent, canActivate: [InventoryAuthGuard]  },
{path: 'timeslot', component:TimeslotComponent, canActivate: [InventoryAuthGuard]  },
{path: '', redirectTo: 'login', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
