import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedWetlandsPage } from './saved-wetlands.page';

const routes: Routes = [
  {
    path: '',
    component: SavedWetlandsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedWetlandsPageRoutingModule {}
