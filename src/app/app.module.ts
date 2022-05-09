import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadClientComponent } from './Client/read-client/read-client.component';
import { NavigationComponent } from './Navbar/navigation/navigation.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { CreateClientComponent } from './Client/create-client/create-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientUpdateComponent } from './Client/update-client/client-update.component';
import { CreateSecurityquestionComponent } from './Securityquestion/create-securityquestion/create-securityquestion.component';
import { ReadSecurityquestionComponent } from './Securityquestion/read-securityquestion/read-securityquestion.component';
import { UpdateSecurityquestionComponent } from './Securityquestion/update-securityquestion/update-securityquestion.component';
import { CreateDeliverystatusComponent } from './Deliverystatus/create-deliverystatus/create-deliverystatus.component';
import { ReadDeliverystatusComponent } from './Deliverystatus/read-deliverystatus/read-deliverystatus.component';
import { UpdateDeliverystatusComponent } from './Deliverystatus/update-deliverystatus/update-deliverystatus.component';
import { CreateWarehouseComponent } from './Warehouse/create-warehouse/create-warehouse.component';
import { ReadWarehouseComponent } from './Warehouse/read-warehouse/read-warehouse.component';
import { UpdateWarehouseComponent } from './Warehouse/update-warehouse/update-warehouse.component';
import { CreatewarrantyperiodComponent } from './WarrantyPeriod/createwarrantyperiod/createwarrantyperiod.component';
import { ReadwarrantyperiodComponent } from './WarrantyPeriod/readwarrantyperiod/readwarrantyperiod.component';
import { UpdatewarrantyperiodComponent } from './WarrantyPeriod/updatewarrantyperiod/updatewarrantyperiod.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepreciationComponent } from './Depreciation/depreciation/depreciation.component';


@NgModule({
  declarations: [
    AppComponent,
    ReadClientComponent,
    NavigationComponent,
    DashboardComponent,
    CreateClientComponent,
    ClientUpdateComponent,
    CreateSecurityquestionComponent,
    ReadSecurityquestionComponent,
    UpdateSecurityquestionComponent,
    CreateDeliverystatusComponent,
    ReadDeliverystatusComponent,
    UpdateDeliverystatusComponent,
    CreateWarehouseComponent,
    ReadWarehouseComponent,
    UpdateWarehouseComponent,
    CreatewarrantyperiodComponent,
    ReadwarrantyperiodComponent,
    UpdatewarrantyperiodComponent,
    DepreciationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
