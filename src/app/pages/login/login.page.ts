import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  userLogin = {
    email: '',
    password: '',
  };

  constructor(
    public fireservices: UsersService,
    public alertController: AlertController,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[a-zA-Z0-9@_\-!]+/),
      ]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      const userLogin = this.loginForm.value;
      this.fireservices
        .loginWithEmail(userLogin)
        .then((userDetails) => {
          const user = userDetails.user;
  
          this.fireservices.getUserDetails(user).subscribe((userData: any) => {
            if (userData && Object.keys(userData).length !== 0) { 
              if (userData.userType === 'admin') {
                this.router.navigate(['/admin-dashboard']); 
              } else {
                this.router.navigate(['/user-dashboard']);
              }
            } 
          });
        })
        .catch((error) => {
          this.showAlert('User Not Found', 'The user does not exist.');
        });
    } else {
      this.showAlert('Form Error', 'Please check the form fields.');
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
