import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications } from '@capacitor/local-notifications';
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
  
  wetlands: any[] = [];
  currentUser: any = null;
  notificationSentWetlands: Set<string> = new Set();

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
    this.trackUserLocation();
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

  async trackUserLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    const userLat = coordinates.coords.latitude;
    const userLng = coordinates.coords.longitude;
  
    this.wetlands.forEach((wetland) => {
      const { latitude: wetlandLat, longitude: wetlandLng } = this.parseCoordinates(wetland.location_coordinates);
  
      if (wetlandLat && wetlandLng) {
        const distance = this.calculateDistance(userLat, userLng, wetlandLat, wetlandLng);
        if (distance <= 5 && !this.notificationSentWetlands.has(wetland.id)) { // Within 5 km
          this.sendNotification(wetland);
          this.notificationSentWetlands.add(wetland.id);
        }
      } else {
        console.error('Invalid coordinates for wetland:', wetland);
      }
    });
  }
  
  parseCoordinates(coordinates: any): { latitude: number, longitude: number } {
    if (typeof coordinates === 'object' && 'latitude' in coordinates && 'longitude' in coordinates) {
      return { latitude: coordinates.latitude, longitude: coordinates.longitude };
    } else if (typeof coordinates === 'string') {
      const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
      return { latitude: lat, longitude: lng };
    } else {
      console.error('Invalid coordinate format:', coordinates);
      return { latitude: NaN, longitude: NaN };
    }
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  async sendNotification(wetland: any) {
    if (!this.currentUser) {
      console.error('No user logged in');
      return;
    }

    const { latitude, longitude } = this.parseCoordinates(wetland.location_coordinates);
    const notificationData = {
      userId: this.currentUser.uid,
      title: `You are near ${wetland.wetland_name}!`,
      body: `This wetland is located in ${wetland.district}. Check the map for more details.`,
      timestamp: new Date(),
      wetlandInfo: {
        lat: latitude,
        lng: longitude,
        name: wetland.wetland_name,
        district: wetland.district,
        size: wetland.wetland_size,
        type: wetland.wetland_type
      }
    };

    // Save notification to Firestore
    try {
      await this.firestore.collection('notifications').add(notificationData);
      console.log('Notification saved to Firestore');
    } catch (error) {
      console.error('Error saving notification to Firestore:', error);
    }

    // Schedule local notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: notificationData.title,
          body: notificationData.body,
          id: new Date().getTime(),
          extra: notificationData.wetlandInfo
        }
      ]
    });

    this.showToast(`Notification sent for ${wetland.wetland_name}`);
  }

  // async sendNotification(wetland: any) {
  //   const { latitude, longitude } = this.parseCoordinates(wetland.location_coordinates);
  //   await LocalNotifications.schedule({
  //     notifications: [
  //       {
  //         title: `You are near ${wetland.wetland_name}!`,
  //         body: `This wetland is located in ${wetland.district}. Check the map for more details.`,
  //         id: new Date().getTime(),
  //         extra: {
  //           lat: latitude,
  //           lng: longitude,
  //           name: wetland.wetland_name,
  //           district: wetland.district,
  //           size: wetland.wetland_size,
  //           type: wetland.wetland_type
  //         }
  //       }
  //     ]
  //   });
  //   this.showToast(`Notification sent for ${wetland.wetland_name}`);
  // }

  viewMap(wetland: any) {
    const { latitude, longitude } = this.parseCoordinates(wetland.location_coordinates);
    if (!isNaN(latitude) && !isNaN(longitude)) {
      this.router.navigate(['/wetlands-map'], {
        queryParams: {
          lat: latitude,
          lng: longitude,
          name: wetland.wetland_name,
          district: wetland.district,
          size: wetland.wetland_size,
          type: wetland.wetland_type
        }
      });
    } else {
      this.showAlert('Error', 'Invalid coordinates for this wetland.');
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