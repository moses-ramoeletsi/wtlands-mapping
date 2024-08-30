import { Component, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {

  showUserProfile: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleToUserProfile(){
    this.showUserProfile = !this.showUserProfile;
  }

  async editProfile(modal: IonModal) {
    // this.resetArticle(modal);
    // this.userPprofile = {
    //   id: article.id, 
    //   article_title: article.article_title,
    //   description: article.description,
    //   articleUrl: article.articleUrl,
    //   authorName: article.authorName,
    //   authorId: article.authorId,
    // };
  
    await modal.present();
  }
  
}
