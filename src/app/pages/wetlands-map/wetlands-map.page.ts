import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as L from 'leaflet';
import { WetlandsService } from 'src/app/services/wetlands.service';
import { icon, Marker } from 'leaflet';
import { UsersService } from 'src/app/services/users.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';

@Component({
  selector: 'app-wetlands-map',
  templateUrl: './wetlands-map.page.html',
  styleUrls: ['./wetlands-map.page.scss'],
})
export class WetlandsMapPage implements OnInit, AfterViewInit {

  leafletMap: any;
  lat: number = -29.31667;
  lng: number = 27.483331;
  zoom: number = 6.5;
  wetlands: any[] = [];
  currentUserType?: string;

  focusedWetland: {
    lat: number,
    lng: number,
    name: string,
    district: string,
    size: string,
    type: string
  } | null = null;
  markers: L.Marker[] = [];

  constructor(
    private firestore: AngularFirestore,
    private wetlandsService: WetlandsService,
    private userAuth: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userAuth.getAuth().user.subscribe(user => {
      if (user) {
        this.firestore.collection('users').doc(user.uid).get().subscribe(doc => {
          const data = doc.data() as { userType: string };
          this.currentUserType = data.userType;
        }); 
      }
  
    })
    this.getWetlands();
    this.route.queryParams.subscribe(params => {
      if (params['lat'] && params['lng'] && params['name']) {
        this.focusedWetland = {
          lat: parseFloat(params['lat']),
          lng: parseFloat(params['lng']),
          name: params['name'],
          district: params['district'] || 'N/A',
          size: params['size'] || 'N/A',
          type: params['type'] || 'N/A'
        };
      }
    });
    this.setCustomIcon();
  }

  setCustomIcon() {
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [20, 43],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
  }

  ngAfterViewInit() {
    this.loadLeafletMap();
  }

  getWetlands() {
    this.wetlandsService.fetchWetlandData().subscribe((wetlands) => {
      this.wetlands = wetlands;
      this.updateMarkers();
    });
  }

  loadLeafletMap() {
    if (this.focusedWetland) {
      this.lat = this.focusedWetland.lat;
      this.lng = this.focusedWetland.lng;
      this.zoom = 8; 
    }

    this.leafletMap = L.map('map').setView([this.lat, this.lng], this.zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.leafletMap);

    requestAnimationFrame(() => {
      this.leafletMap.invalidateSize();
    });

    this.updateMarkers();
  }

  updateMarkers() {
    this.markers.forEach(marker => this.leafletMap.removeLayer(marker));
    this.markers = [];

    if (this.focusedWetland) {
      this.addFocusedWetlandMarker();
    } else {
      this.addWetlandMarkers();
    }
  }

  addWetlandMarkers() {
    this.wetlands.forEach(wetland => {
      if (wetland.location_coordinates) {
        let lat, lng;
        if (typeof wetland.location_coordinates === 'string') {
          [lat, lng] = wetland.location_coordinates.split(',').map((coord: string) => parseFloat(coord.trim()));
        } else if (typeof wetland.location_coordinates === 'object') {
          lat = wetland.location_coordinates.latitude;
          lng = wetland.location_coordinates.longitude;
        }

        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
          const marker = L.marker([lat, lng]).addTo(this.leafletMap);
          marker.bindPopup(`
            <b>${wetland.wetland_name}</b><br>
            Type: ${wetland.wetland_type}<br>
            Size: ${wetland.wetland_size}
          `);
          this.markers.push(marker);
        } else {
          console.log('Invalid coordinates for wetland:', wetland.wetland_name);
        }
      } else {
        console.log('No coordinates for wetland:', wetland.wetland_name);
      }
    });
  }

  addFocusedWetlandMarker() {
    if (this.focusedWetland) {
      const marker = L.marker([this.focusedWetland.lat, this.focusedWetland.lng])
        .addTo(this.leafletMap);
      const popupContent = `
        <b>${this.focusedWetland.name}</b><br>
        Type: ${this.focusedWetland.type}<br>
        District: ${this.focusedWetland.district}<br>
        Size: ${this.focusedWetland.size}
      `;
      marker.bindPopup(popupContent).openPopup();
      this.markers.push(marker);
    }
  }
  onBackButtonClick() {
    if (this.currentUserType === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.currentUserType === 'user') {
      this.router.navigate(['/user-dashboard']);
    }
  }
}
