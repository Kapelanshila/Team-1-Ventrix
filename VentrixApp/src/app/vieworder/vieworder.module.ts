import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExtensionPipe } from '../pipes/extension.pipe';

import { VieworderPageRoutingModule } from './vieworder-routing.module';

import { VieworderPage } from './vieworder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VieworderPageRoutingModule
  ],
  declarations: [VieworderPage,ExtensionPipe]
})
export class VieworderPageModule {}
