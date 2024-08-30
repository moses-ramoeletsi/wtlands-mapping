import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginAndRegisterScreenPageRoutingModule } from './login-and-register-screen-routing.module';

import { LoginAndRegisterScreenPage } from './login-and-register-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginAndRegisterScreenPageRoutingModule
  ],
  declarations: [LoginAndRegisterScreenPage]
})
export class LoginAndRegisterScreenPageModule {}
