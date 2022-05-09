import { NgModule } from '@angular/core';
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

const routes: Routes = [{ path: 'app', component: AppComponent },
{ path: 'create-client', component: CreateClientComponent },
{ path: 'read-client', component: ReadClientComponent },
{ path: 'update-client', component: ClientUpdateComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'create-supplier', component: CreateSupplierComponent },
{ path: 'update-supplier', component: UpdateSupplierComponent },
{ path: 'create-user', component: CreateUserComponent },
{ path: 'update-user', component: UpdateUserComponent },
{ path: 'read-user', component: ReadUserComponent },
{ path: 'read-supplier', component: ReadSupplierComponent },
];
// { path: '', redirectTo: 'dashboard', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
