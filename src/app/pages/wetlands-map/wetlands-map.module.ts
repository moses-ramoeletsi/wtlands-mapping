import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WetlandsMapPageRoutingModule } from './wetlands-map-routing.module';

import { WetlandsMapPage } from './wetlands-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WetlandsMapPageRoutingModule
  ],
  declarations: [WetlandsMapPage]
})
export class WetlandsMapPageModule {}
