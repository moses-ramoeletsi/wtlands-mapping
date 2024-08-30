import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAndRegisterScreenPage } from './login-and-register-screen.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAndRegisterScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAndRegisterScreenPageRoutingModule {}
