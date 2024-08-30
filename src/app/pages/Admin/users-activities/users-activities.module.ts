import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersActivitiesPageRoutingModule } from './users-activities-routing.module';

import { UsersActivitiesPage } from './users-activities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersActivitiesPageRoutingModule
  ],
  declarations: [UsersActivitiesPage]
})
export class UsersActivitiesPageModule {}
