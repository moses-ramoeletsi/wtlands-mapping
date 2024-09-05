import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { WetlandsService } from 'src/app/services/wetlands.service';

@Component({
  selector: 'app-wetlands',
  templateUrl: './wetlands.page.html',
  styleUrls: ['./wetlands.page.scss'],
})
export class WetlandsPage implements OnInit {

  wetland = {
    id: '',
    wetland_name:'',
    wetland_type: '',
    district:'',
    location_coordinates:'',
    wetland_size:'',
    conservation_status:''
  }
  
  wetlands: any[]  =[];
  currentUser: any = null;
  constructor(
    private wetlandfireserivce: WetlandsService,
    private usersService: UsersService,
    private firestore: AngularFirestore, 
    private toastController: ToastController) { }

  ngOnInit() {
    this.getWetlands();
    this.getCurrentUser();
  }

  getWetlands() {
    this.wetlandfireserivce.fetchWetlandData().subscribe((wetlands) => {
      this.wetlands = wetlands;
    });
  }

  getCurrentUser() {
    this.usersService.getAuth().authState.subscribe(user => {
      if (user) {
        this.usersService.getCurrentUserDetails(user.uid).subscribe((userData) => {
          this.currentUser = userData;
          console.log('Current User:', this.currentUser);
        });
      } else {
        console.log('No user is logged in');
      }
    });
  }
  

  saveWetland(wetland: any) {
    if (this.currentUser) {
      const savedWetland = {
        userId: this.currentUser.uid,
        userName: this.currentUser.name,
        wetland_name: wetland.wetland_name,
        wetland_type: wetland.wetland_type,
        district: wetland.district,
        location_coordinates: wetland.location_coordinates,
        wetland_size: wetland.wetland_size,
        conservation_status: wetland.conservation_status,
        savedAt: new Date() // Adding a timestamp for when the wetland was saved
      };

      this.firestore.collection('savedWetlands').add(savedWetland).then(() => {
        this.showToast('Wetland saved successfully!');
      }).catch((error) => {
        console.error('Error saving wetland:', error);
        this.showToast('Error saving wetland!');
      });

      console.log('User Name:', this.currentUser.name);
      console.log('User UID:', this.currentUser.uid);
    } else {
      this.showToast('User not found!');
    }
  }
  // saveWetland() {
  //   if (this.currentUser) {
  //     console.log('User Name:', this.currentUser.name);
  //     console.log('User UID:', this.currentUser.uid);
  //     this.showToast('Wetland saved successfully!');
  //     // You can add further logic here for saving the wetland data
  //   } else {
  //     this.showToast('User not found!');
  //   }
  // }
  
  
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
