import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WetlandsMapPage } from './wetlands-map.page';

const routes: Routes = [
  {
    path: '',
    component: WetlandsMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WetlandsMapPageRoutingModule {}
