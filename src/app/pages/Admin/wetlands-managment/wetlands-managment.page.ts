import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { WetlandsService } from 'src/app/services/wetlands.service';

@Component({
  selector: 'app-wetlands-managment',
  templateUrl: './wetlands-managment.page.html',
  styleUrls: ['./wetlands-managment.page.scss'],
})
export class WetlandsManagmentPage implements OnInit {

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

  constructor(
    private firestore: WetlandsService,
    private alertController: AlertController,
    private router : Router
  ) { }

  ngOnInit() {
    this.getWetlands();
  }
  async addWetlandData(modal: IonModal) {

    try {   
      const coords = this.wetland.location_coordinates.split(',').map(coord => parseFloat(coord.trim()));
      
      if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
        this.showAlert('Error', 'Invalid coordinates format. Please use "latitude, longitude".');
        return;
      }

      const wetlandData = {
        ...this.wetland,
        location_coordinates: {
          latitude: coords[0],
          longitude: coords[1]
        }
      };

      if (this.wetland.id) {
        await this.firestore.updateWetlandData(wetlandData);
        this.showAlert('Success', 'Wetland data updated successfully!');
      } else {
        await this.firestore.addNewWetland(wetlandData);
        this.showAlert('Success', 'Wetland data added successfully!');    
      }
  
      this.resetwetland(modal);
      await modal.dismiss();
      
    } catch (error) {
      this.showAlert('Error', 'Error posting wetland data!');
    }
  }
  resetwetland(modal: IonModal) {
    this.wetland = {
      id: '',
      wetland_name:'',
      wetland_type: '',
      district:'',
      location_coordinates:'',
      wetland_size:'',
      conservation_status:'' 
    };
    modal.dismiss();
  }
  
  getWetlands() {
    this.firestore.fetchWetlandData().subscribe((wetlands) => {
      this.wetlands = wetlands;
    });
  }
  async editWetlandData(wetland: any, modal: IonModal) {
    this.resetwetland(modal);
    this.wetland = {
      id: wetland.id,
      wetland_name:wetland.wetland_name,
      wetland_type: wetland.wetland_type,
      district:wetland.district,
      location_coordinates:wetland.location_coordinates,
      wetland_size: wetland.wetland_size,
      conservation_status:wetland.conservation_status
    };
  
    await modal.present();
  }
  
  
  
  async deleteWetlandData(wetland: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete the wetland for ${wetland.wetland_name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.firestore.deleteWetland(wetland);
              this.showAlert('Success', 'Wetland data deleted successfully!');
            } catch (error) {
              this.showAlert('Error', 'Error deleting wetland!');
            }
          }
        }
      ]
    });
    
    await alert.present();
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
  
}
