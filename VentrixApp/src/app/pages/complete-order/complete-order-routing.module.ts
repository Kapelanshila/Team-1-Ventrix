import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteOrderPage } from './complete-order.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteOrderPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteOrderPageRoutingModule {}
