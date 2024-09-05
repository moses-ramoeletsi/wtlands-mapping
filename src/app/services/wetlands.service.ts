import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WetlandsService {

  constructor(private firestore: AngularFirestore) { }

  addNewWetland(wetland: any){
    const docRef = this.firestore.collection('wetlands').doc();
    const id = docRef.ref.id;
    wetland.id = id;
    return docRef.set(wetland)

  }

  fetchWetlandData() : Observable<any[]>{
    return this.firestore.collection('wetlands').valueChanges();
  }
  updateWetlandData(wetland: any) {
    return this.firestore.collection('wetlands').doc(wetland.id).update(wetland);
  }

  deleteWetland(wetland: any) {
    return this.firestore.collection('wetlands').doc(wetland.id).delete();
  }
  // saveWetlandData(wetland: any) {
  //   const docRef = this.firestore.collection('savedWetlands').doc();
  //   const id = docRef.ref.id;
  //   wetland.id = id;
  //   return docRef.set(wetland);
  // }
  saveWetlandData(wetland: any) {
    const docRef = this.firestore.collection('savedWetlands').doc(wetland.id);
    return docRef.set(wetland);
  }
}
