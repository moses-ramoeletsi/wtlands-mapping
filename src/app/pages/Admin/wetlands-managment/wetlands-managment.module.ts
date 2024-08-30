import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WetlandsManagmentPageRoutingModule } from './wetlands-managment-routing.module';

import { WetlandsManagmentPage } from './wetlands-managment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WetlandsManagmentPageRoutingModule
  ],
  declarations: [WetlandsManagmentPage]
})
export class WetlandsManagmentPageModule {}
