import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./auth/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'deliveries',
    loadChildren: () => import('./pages/deliveries/deliveries.module').then( m => m.DeliveriesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'collection',
    loadChildren: () => import('./pages/collection/collection.module').then( m => m.CollectionPageModule)
  },
  {
    path: 'details/:clientId',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./pages/route/route.module').then( m => m.RoutePageModule)
  },
  {
    path: 'schedule/:orderId/:clientId',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'reschedule/:orderId/:clientId',
    loadChildren: () => import('./pages/reschedule/reschedule.module').then( m => m.ReschedulePageModule)
  },
  {
    path: 'complete/:orderId/:clientId',
    loadChildren: () => import('./pages/complete-order/complete-order.module').then( m => m.CompleteOrderPageModule)
  },
  {
    path: 'vieworder/:clientOrderId',
    loadChildren: () => import('./vieworder/vieworder.module').then( m => m.VieworderPageModule)
  },
  {
    path: 'searchorder',
    loadChildren: () => import('./searchorder/searchorder.module').then( m => m.SearchorderPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
