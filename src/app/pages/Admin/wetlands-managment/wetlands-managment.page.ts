import { Component, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-wetlands-managment',
  templateUrl: './wetlands-managment.page.html',
  styleUrls: ['./wetlands-managment.page.scss'],
})
export class WetlandsManagmentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  close(){
    
  }

  async editWetland(modal: IonModal) {
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
