import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  currentUser!: '';
  constructor(  public firebaseStore: AngularFirestore,
    public userAuth: AngularFireAuth) { }

    signupWithEmail(data: { email: string; password: string }) {
      return this.userAuth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
    }
     saveUserDetails(data: any) {
    return this.firebaseStore.collection('users').doc(data.uid).set(data);
  }

  loginWithEmail(data: { email: string; password: string }) {
    return this.userAuth.signInWithEmailAndPassword(data.email, data.password);
  }
  getUserDetails(data: any) {
    return this.firebaseStore.collection('users').doc(data.uid).valueChanges();
  }

  getUsersWithTypeUser(): Observable<any[]> {
    return this.firebaseStore.collection('users', ref => ref.where('userType', '==', 'user'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Record<string, any>;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  
  getUsers(): Observable<any[]> {
    return this.firebaseStore.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Record<string, any>;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getCurrentUser(): Observable<any> {
    return this.userAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firebaseStore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  getCurrentUserDetails(uid: string): Observable<any> {
    return this.firebaseStore.collection('users').doc(uid).valueChanges();
  }
  getAuth() {
    return this.userAuth;
  }

  getUserSavedWetlands(userId: string): Observable<any[]> {
    return this.firebaseStore.collection('savedWetlands', ref => ref.where('userId', '==', userId))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Record<string, any>;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getUserFeedback(userId: string): Observable<any[]> {
    return this.firebaseStore.collection('userFeedback', ref => ref.where('userId', '==', userId))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Record<string, any>;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

}
