import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
 selector: 'app-notifications',
 templateUrl: './notifications.page.html',
 styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
 notifications$!: Observable<any[]>;
 currentUser: any;

 constructor(
  private firestore: AngularFirestore,
  private usersService: UsersService,
  private router: Router,
  private alertController: AlertController
 ) {}

 ngOnInit() {
  this.getCurrentUser();
 }

 getCurrentUser() {
  this.usersService.getAuth().authState.subscribe((user) => {
   if (user) {
    this.currentUser = user;
    this.getNotifications();
   } else {
    console.log('No user is logged in');
   }
  });
 }

 getNotifications() {
  this.notifications$ = this.firestore
   .collection('notifications', (ref) =>
    ref
     .where('userId', '==', this.currentUser.uid)
     .orderBy('timestamp', 'desc')
     .limit(50)
   )
   .snapshotChanges()
   .pipe(
    map((actions) =>
     actions.map((a) => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
     })
    )
   );
 }

 viewWetlandDetails(wetlandInfo: any) {
  this.router.navigate(['/wetlands-map'], {
   queryParams: {
    lat: wetlandInfo.lat,
    lng: wetlandInfo.lng,
    name: wetlandInfo.name,
    district: wetlandInfo.district,
    size: wetlandInfo.size,
    type: wetlandInfo.type,
   },
  });
 }

 async deleteNotification(notificationId: string) {
  const alert = await this.alertController.create({
    header: 'Confirm Delete',
    message: `Are you sure you want to delete the notification for this wetland?`,
    buttons: [
    {
     text: 'Cancel',
     role: 'cancel',
    },
    {
     text: 'Delete',
     handler: async () => {
      try {
       await this.firestore.collection('notifications').doc(notificationId).delete();
       this.showAlert('Success', 'Notification deleted');
      } catch (error) {
       this.showAlert('Error', 'Error deleting notification!');
      }
     },
    },
   ],
  });

  await alert.present();
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
