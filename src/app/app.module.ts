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
import { CreateUserComponent } from './create-user/create-user.component';
import { ReadUserComponent } from './read-user/read-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { ReadSupplierComponent } from './read-supplier/read-supplier.component';
import { UpdateSupplierComponent } from './update-supplier/update-supplier.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserDetailsComponent } from './update-user-details/update-user-details.component';

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
    RegisterUserComponent,
    UpdateUserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
