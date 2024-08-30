import { Component, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-user-content-and-feedback',
  templateUrl: './user-content-and-feedback.page.html',
  styleUrls: ['./user-content-and-feedback.page.scss'],
})
export class UserContentAndFeedbackPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  editFeedBack(modal: IonModal) {

    modal.present();
  }
}
