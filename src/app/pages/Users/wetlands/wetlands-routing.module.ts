import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WetlandsPage } from './wetlands.page';

const routes: Routes = [
  {
    path: '',
    component: WetlandsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WetlandsPageRoutingModule {}
