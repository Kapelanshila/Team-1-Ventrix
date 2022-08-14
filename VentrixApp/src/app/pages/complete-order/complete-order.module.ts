import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteOrderPageRoutingModule } from './complete-order-routing.module';

import { CompleteOrderPage } from './complete-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteOrderPageRoutingModule
  ],
  declarations: [CompleteOrderPage]
})
export class CompleteOrderPageModule {}
