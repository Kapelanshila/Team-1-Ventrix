import { Component, NgModule } from '@angular/core';
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
import { CreateAssetComponent } from './Assets/create-asset/create-asset.component';
import { ReadAssetComponent } from './Assets/read-asset/read-asset.component';
import { UpdateAssetComponent } from './Assets/update-asset/update-asset.component';
import { UpdateProfileComponent } from './UpdateProfile/update-profile.component';
import { CreateSupplierOrderComponent } from './SupplierOrder/create-supplier-order/create-supplier-order.component';
import { ReadSupplierOrderComponent } from './SupplierOrder/read-supplier-order/read-supplier-order.component';
import { UpdateSupplierOrderComponent } from './SupplierOrder/update-supplier-order/update-supplier-order.component';
import { CreateClientOrderComponent } from './ClientOrder/create-client-order/create-client-order.component';
import { ReadClientOrderComponent } from './ClientOrder/read-client-order/read-client-order.component';
import { UpdateClientOrderComponent } from './ClientOrder/update-client-order/update-client-order.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExtensionPipe } from './pipes/extension.pipe';
import { TimePipe } from './pipes/time.pipe';
import { ReadClientOrderlineComponent } from './ClientOrderLine/ReadClientOrderLine/read-client-orderline.component';
import { UpdateClientOrderlineComponent } from './ClientOrderLine/UpdateClientOrderLine/update-client-orderline.component';
import { ReadSupplierOrderlineComponent } from './SupplierOrderLine/ReadSupplierOrderLine/read-supplier-orderline.component';
import { UpdateSupplierOrderlineComponent } from './SupplierOrderLine/UpdateSupplierOrderLine/update-supplier-orderline.component';
import { PackOrderComponent } from './PackOrder/pack-order.component';
import { RevertPackOrderComponent } from './RevertPackOrder/revert-pack-order.component';
import { WriteOffInventoryComponent } from './WriteOffInventory/write-off-inventory.component';
import { WriteOffComponent } from './WriteOffInventory/WriteOff/write-off.component';
import { ViewWriteOffsComponent } from './WriteOffInventory/ViewWriteOffs/view-write-offs.component';
import { ReadInventoryStocktakeComponent } from './StockTake/Inventory/ReadInventoryStockTake/read-inventory-stocktake.component';
import { CreateInventoryStocktakeComponent } from './StockTake/Inventory/CreateInventoryStockTake/create-inventory-stocktake.component';
import { DatePipe } from './pipes/date.pipe';
import { ViewAssetComponent } from './Assets/view-asset/view-asset.component';
import { GaugeChartModule } from 'angular-gauge-chart'
import { NgCircleProgressModule } from 'ng-circle-progress';
import {TimelineModule} from 'primeng/timeline';
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
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeslotComponent } from './Timeslot/timeslot.component';
import { CreateTimeslotComponent } from './Timeslot/CreateTimeslot/create-timeslot.component';
import { ReadTimeslotComponent } from './Timeslot/ReadTimeslot/read-timeslot.component';
import { UpdateTimeslotComponent } from './Timeslot/UpdateTimeslot/update-timeslot.component';
import { CompletedOrdersComponent } from './ClientOrder/completed-orders/completed-orders.component';
import { InventoryReportComponent } from './Reporting/inventory-report/inventory-report.component';
import { AssetReportComponent } from './Reporting/asset-report/asset-report.component';
import { DepreciationReportComponent } from './Reporting/depreciation-report/depreciation-report.component';
import { EmployeesReportComponent } from './Reporting/employees-report/employees-report.component';
import { ManagementReportComponent } from './Reporting/management-report/management-report.component';
import { BackupRestoreComponent } from './Backup-Restore/backup-restore.component';
import { ChartsModule } from 'ng2-charts';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SupplyDemandReportComponent } from './Reporting/supply-demand-report/supply-demand-report.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadClientComponent,
    NavigationComponent,
    DashboardComponent,
    CreateClientComponent,
    SupplyDemandReportComponent,
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
    CreateAssetComponent,
    ReadAssetComponent,
    UpdateAssetComponent,
    UpdateProfileComponent,
    CreateSupplierOrderComponent,
    ReadSupplierOrderComponent,
    UpdateSupplierOrderComponent,
    CreateClientOrderComponent,
    ReadClientOrderComponent,
    UpdateClientOrderComponent,
    ExtensionPipe,
    TimePipe,
    ReadClientOrderlineComponent,
    UpdateClientOrderlineComponent,
    ReadSupplierOrderlineComponent,
    UpdateSupplierOrderlineComponent,
    PackOrderComponent,
    RevertPackOrderComponent,
    WriteOffInventoryComponent,
    WriteOffComponent,
    ViewWriteOffsComponent,
    ReadInventoryStocktakeComponent,
    CreateInventoryStocktakeComponent,
    DatePipe,
    ViewAssetComponent,
    AssetRepairComponent,
    CreateAssetRepairComponent,
    ReadAssetRepairComponent,
    UpdateAssetRepairComponent,
    RevertRepairComponent,
    ReadAssignedAssetComponent,
    UndoAssignedAssetComponent,
    ReadCheckoutComponent,
    ViewCheckoutsComponent,
    ReadCheckinComponent,
    ViewCheckinComponent,
    ReadAssetWriteoffComponent,
    ViewAssetWriteoffComponent,
    CreateAssetWriteoffComponent,
    ReadAssettrailComponent,
    TimeslotComponent,
    CreateTimeslotComponent,
    ReadTimeslotComponent,
    UpdateTimeslotComponent,
    CompletedOrdersComponent,
    InventoryReportComponent,
    AssetReportComponent,
    DepreciationReportComponent,
    EmployeesReportComponent,
    ManagementReportComponent,
    BackupRestoreComponent
  ],
  imports: [
    ChartsModule,
    MatButtonModule,
    GaugeChartModule,
     BrowserModule,
    AppRoutingModule,
    MatTreeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgOtpInputModule, 
    NgSelectModule,
    MatIconModule,
    NgCircleProgressModule.forRoot({}),
    TimelineModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
