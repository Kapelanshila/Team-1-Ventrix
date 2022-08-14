import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReschedulePageRoutingModule } from './reschedule-routing.module';

import { ReschedulePage } from './reschedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReschedulePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReschedulePage]
})
export class ReschedulePageModule {}
