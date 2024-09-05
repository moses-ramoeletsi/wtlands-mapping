import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { UserFeedbackService } from 'src/app/services/user-feedback.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.page.html',
  styleUrls: ['./user-feedback.page.scss'],
})
export class UserFeedbackPage implements OnInit {
  userFeedback = {
    id: '', 
    userId: '',
    name:"",
    email:"",
    feedBackType: "",
    message:""
  };
  
  feedback: any[] = [];

  constructor(
    private userFeedBackServices: UserFeedbackService,
    private userAuth:  AngularFireAuth, 
    private fireservices: UsersService,
    private alertController: AlertController
  ) {}
   loadUserFeedback(uid: string) {
    this.userFeedBackServices.getUserFeedback(this.userFeedback.userId).subscribe(feedback => {
      this.feedback = feedback;
    });
  }

  ngOnInit() {
    this.getUserFeedBack();
  } 
  getUserFeedBack(){
    this.userFeedBackServices.fetchUserFeedBack().subscribe((feedback) =>{
      this.feedback = feedback;
    })
  }
}
