import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VieworderPage } from './vieworder.page';

const routes: Routes = [
  {
    path: '',
    component: VieworderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VieworderPageRoutingModule {}
