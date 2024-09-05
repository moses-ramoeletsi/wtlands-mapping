import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-saved-wetlands',
  templateUrl: './saved-wetlands.page.html',
  styleUrls: ['./saved-wetlands.page.scss'],
})
export class SavedWetlandsPage implements OnInit {

  savedWetlands: any[] = []; // To store saved wetlands for the current user
  currentUser: any = null;   // To store the current user's details

  constructor(
    private firestore: AngularFirestore,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.usersService.getAuth().authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.getSavedWetlands(user.uid); // Fetch saved wetlands for the current user
      } else {
        console.log('No user is logged in');
      }
    });
  }

  getSavedWetlands(uid: string) {
    this.firestore.collection('savedWetlands', ref => ref.where('userId', '==', uid))
      .valueChanges()
      .subscribe((wetlands: any[]) => {
        this.savedWetlands = wetlands;
      });
  }
}
