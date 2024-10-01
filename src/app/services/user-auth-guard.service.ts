import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate {

  constructor(
    private userAuth: UserAuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  async canActivate(): Promise<boolean> {
    if (this.userAuth.isLoggedIn()) {
      return true;
    } else {
      await this.presentToast('Please log in to access this page');
      this.router.navigate(['/login']);
      return false;
    }
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}
