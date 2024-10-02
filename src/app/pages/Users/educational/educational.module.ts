import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationalPageRoutingModule } from './educational-routing.module';

import { EducationalPage } from './educational.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationalPageRoutingModule
  ],
  declarations: [EducationalPage]
})
export class EducationalPageModule {}
