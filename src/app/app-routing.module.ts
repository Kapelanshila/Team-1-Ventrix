import { UpdatewarrantyperiodComponent } from './WarrantyPeriod/updatewarrantyperiod/updatewarrantyperiod.component';
import { ReadwarrantyperiodComponent } from './WarrantyPeriod/readwarrantyperiod/readwarrantyperiod.component';
import { CreatewarrantyperiodComponent } from './WarrantyPeriod/createwarrantyperiod/createwarrantyperiod.component';
import { UpdateWarehouseComponent } from './Warehouse/update-warehouse/update-warehouse.component';
import { ReadWarehouseComponent } from './Warehouse/read-warehouse/read-warehouse.component';
import { CreateWarehouseComponent } from './Warehouse/create-warehouse/create-warehouse.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadClientComponent } from './Client/read-client/read-client.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { CreateClientComponent } from './Client/create-client/create-client.component';
import { ClientUpdateComponent } from './Client/update-client/client-update.component';
import { CreateSecurityquestionComponent } from './Securityquestion/create-securityquestion/create-securityquestion.component';
import { UpdateSecurityquestionComponent } from './Securityquestion/update-securityquestion/update-securityquestion.component';
import { ReadSecurityquestionComponent } from './Securityquestion/read-securityquestion/read-securityquestion.component';
import { CreateDeliverystatusComponent } from './Deliverystatus/create-deliverystatus/create-deliverystatus.component';
import { ReadDeliverystatusComponent } from './Deliverystatus/read-deliverystatus/read-deliverystatus.component';
import { UpdateDeliverystatusComponent } from './Deliverystatus/update-deliverystatus/update-deliverystatus.component';
import { LoginComponent } from './Login/login/login.component';
import { DepreciationComponent } from './Depreciation/depreciation/depreciation.component';

const routes: Routes = [{ path: 'app', component: AppComponent },
{ path: 'create-client', component: CreateClientComponent },
{ path: 'read-client', component: ReadClientComponent },
{ path: 'update-client', component: ClientUpdateComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'create-securityquestion', component: CreateSecurityquestionComponent },
{ path: 'read-securityquestion', component: ReadSecurityquestionComponent },
{ path: 'update-securityquestion', component: UpdateSecurityquestionComponent },
{ path: 'create-deliverystatus', component: CreateDeliverystatusComponent },
{ path: 'read-deliverystatus', component: ReadDeliverystatusComponent },
{ path: 'update-deliverystatus', component: UpdateDeliverystatusComponent },
{ path: 'create-warehouse', component: CreateWarehouseComponent },
{ path: 'read-warehouse', component: ReadWarehouseComponent },
{ path: 'update-warehouse', component: UpdateWarehouseComponent },
{ path: 'create-warranty-period', component: CreatewarrantyperiodComponent },
{ path: 'read-warranty-period', component: ReadwarrantyperiodComponent},
{ path: 'update-warranty-period', component: UpdatewarrantyperiodComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'login', component: LoginComponent },
{ path: 'depreciation', component: DepreciationComponent }];

// { path: '', redirectTo: 'dashboard', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
