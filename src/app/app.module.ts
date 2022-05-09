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
import { CreateUserComponent } from './User/create-user/create-user.component';
import { ReadUserComponent } from './User/read-user/read-user.component';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import { CreateSupplierComponent } from './Supplier/create-supplier/create-supplier.component';
import { ReadSupplierComponent } from './Supplier/read-supplier/read-supplier.component';
import { UpdateSupplierComponent } from './Supplier/update-supplier/update-supplier.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
