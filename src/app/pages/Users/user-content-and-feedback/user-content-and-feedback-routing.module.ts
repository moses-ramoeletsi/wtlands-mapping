import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserContentAndFeedbackPage } from './user-content-and-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: UserContentAndFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserContentAndFeedbackPageRoutingModule {}
