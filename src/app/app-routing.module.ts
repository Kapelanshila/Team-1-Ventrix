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

const routes: Routes = [{ path: 'app', component: AppComponent },
{ path: 'create-client', component: CreateClientComponent },
{ path: 'read-client', component: ReadClientComponent },
{ path: 'update-client', component: ClientUpdateComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'create-securityquestion', component: CreateSecurityquestionComponent },
{ path: 'update-securityquestion', component: UpdateSecurityquestionComponent },
{ path: 'create-deliverystatus', component: CreateDeliverystatusComponent },
{ path: 'read-deliverystatus', component: ReadDeliverystatusComponent },
{ path: 'update-deliverystatus', component: UpdateDeliverystatusComponent },
{ path: 'dashboard', component: DashboardComponent },];
// { path: '', redirectTo: 'dashboard', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
