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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { CreateEmployeeComponent } from './Employee/create-employee/create-employee.component';
import { ReadEmployeeComponent } from './Employee/read-employee/read-employee.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadClientComponent,
    NavigationComponent,
    DashboardComponent,
    CreateClientComponent,
    ClientUpdateComponent,
    CreateEmployeeComponent,
    ReadEmployeeComponent,
    UpdateEmployeeComponent
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
