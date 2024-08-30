import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFeedbackPage } from './user-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: UserFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserFeedbackPageRoutingModule {}
