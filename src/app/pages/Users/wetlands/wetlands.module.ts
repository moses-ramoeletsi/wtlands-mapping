import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WetlandsPageRoutingModule } from './wetlands-routing.module';

import { WetlandsPage } from './wetlands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WetlandsPageRoutingModule
  ],
  declarations: [WetlandsPage]
})
export class WetlandsPageModule {}
