import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersManagmentPage } from './users-managment.page';

const routes: Routes = [
  {
    path: '',
    component: UsersManagmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManagmentPageRoutingModule {}
