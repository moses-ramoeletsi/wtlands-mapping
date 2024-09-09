import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
    private router: Router,
    private alertController: AlertController, 
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
        savedAt: new Date() 
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
  viewMap(wetland: any) {
    if (wetland.location_coordinates) {
      let lat, lng;
      if (typeof wetland.location_coordinates === 'string') {
        [lat, lng] = wetland.location_coordinates.split(',').map((coord: string) => parseFloat(coord.trim()));
      } else if (typeof wetland.location_coordinates === 'object') {
        lat = wetland.location_coordinates.latitude;
        lng = wetland.location_coordinates.longitude;
      }

      if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
        this.router.navigate(['/wetlands-map'], {
          queryParams: {
            lat: lat,
            lng: lng,
            name: wetland.wetland_name,
            district: wetland.district,
            size: wetland.wetland_size,
            type: wetland.wetland_type
          }
        });
      } else {
        this.showAlert('Error', 'Invalid coordinates for this wetland.');
      }
    } else {
      this.showAlert('Error', 'No coordinates available for this wetland.');
    }
  }  

  showAlert(title: string, message: string) {
    this.alertController
      .create({
        header: title,
        message: message,
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
