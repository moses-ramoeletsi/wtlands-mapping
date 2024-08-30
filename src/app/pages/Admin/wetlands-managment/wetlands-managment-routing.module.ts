import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WetlandsManagmentPage } from './wetlands-managment.page';

const routes: Routes = [
  {
    path: '',
    component: WetlandsManagmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WetlandsManagmentPageRoutingModule {}
