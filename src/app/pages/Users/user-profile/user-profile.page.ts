import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { AlertController, IonModal } from '@ionic/angular';
import { Observable, filter, switchMap, map } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  showUserProfile: boolean = false;

  userProfile = {
    uid: '',
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
    
  }
  user: Observable<UserModel | null>;
  uid: string ='';

  constructor(
    public fireservices: UsersService,
    public afAuth: AngularFireAuth,
    private userAuth: UserAuthService,
    private alertController: AlertController
  ) {
    this.user = this.afAuth.authState.pipe(
      filter((user) => user !== null),
      switchMap((user) => {
        return this.fireservices.getUserDetails(user);
      }),
      map((userDetails) => userDetails as UserModel)
    );

    this.user.subscribe((userDetails) => {
      if (userDetails) {
        this.userProfile.uid =userDetails.uid;
        this.userProfile.name = userDetails.name;
        this.userProfile.email = userDetails.email;
        this.userProfile.address = userDetails.address;
        this.userProfile.phoneNumber = String(userDetails.phoneNumber);
        this.userProfile.password = userDetails.password;
        this.loadProfile(userDetails.uid);
      }
    });

   }
   loadProfile(uid: string) {
    this.fireservices.getCurrentUserDetails(uid).subscribe(user => {
      this.user = user;
      if (user) {
        this.userProfile = {
          uid: user.uid,
          name: user.name,
          email: user.email,
          address: user.address,
          phoneNumber: String(user.phoneNumber),
          password: user.password,
        };
      }
    });
  }


  ngOnInit() {
  }

  toggleToUserProfile(){
    this.showUserProfile = !this.showUserProfile;
  }
  async updateProfile(modal: IonModal) {

      try {
        await this.fireservices.saveUserDetails(this.userProfile);
        console.log('Profile updated successfully!');
        modal.dismiss();
      } catch (error) {
        console.log('Failed to update profile. Please try again.');
        console.error('Error updating profile:', error);
      }
    
  }
  
  async editProfile(modal: IonModal) {  
    this.userProfile = {
      uid: this.userProfile.uid, 
      name: this.userProfile.name,
      email: this.userProfile.email,
      address: this.userProfile.address,
      phoneNumber: this.userProfile.phoneNumber,
      password: this.userProfile.password,
    };
    await modal.present();
  
  }
   
  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.userAuth.logout();
          }
        }
      ]
    });

    await alert.present();
  }
}
