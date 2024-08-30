import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserContentAndFeedbackPageRoutingModule } from './user-content-and-feedback-routing.module';

import { UserContentAndFeedbackPage } from './user-content-and-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserContentAndFeedbackPageRoutingModule
  ],
  declarations: [UserContentAndFeedbackPage]
})
export class UserContentAndFeedbackPageModule {}
