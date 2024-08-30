import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedWetlandsPageRoutingModule } from './saved-wetlands-routing.module';

import { SavedWetlandsPage } from './saved-wetlands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedWetlandsPageRoutingModule
  ],
  declarations: [SavedWetlandsPage]
})
export class SavedWetlandsPageModule {}
