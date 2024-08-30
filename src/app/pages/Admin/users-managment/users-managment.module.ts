import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersManagmentPageRoutingModule } from './users-managment-routing.module';

import { UsersManagmentPage } from './users-managment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersManagmentPageRoutingModule
  ],
  declarations: [UsersManagmentPage]
})
export class UsersManagmentPageModule {}
