import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationalPage } from './educational.page';

const routes: Routes = [
  {
    path: '',
    component: EducationalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationalPageRoutingModule {}
