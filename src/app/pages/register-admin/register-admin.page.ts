import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.page.html',
  styleUrls: ['./register-admin.page.scss'],
})
export class RegisterAdminPage implements OnInit {

  registerForm!: FormGroup;
  adminData = {
    name: '',
    email: '',
    password: '',
    uid: '',
    userType: 'admin',
  };

  constructor(
    public fireservices: UsersService,
    public alertController: AlertController,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({    
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[5-6]\d{7,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[a-zA-Z0-9@_\-!]+/),
      ]),
    });
  }

  signup() {
    if (this.registerForm.valid) {
      const adminData = { ...this.adminData, ...this.registerForm.value };
      this.fireservices
        .signupWithEmail(adminData)
        .then((userDetails) => {
          const user = userDetails.user;
          adminData.uid = user?.uid as string;
          this.fireservices.saveUserDetails(adminData).then(() => {
            this.showAlert(
              'Registration Successful',
              'You are now registered!'
            );
            this.router.navigate(['/login']);
          });
        })
        .catch((error) => {
          this.showAlert(
            'Registration Error',
            'An error occurred during registration.'
          );
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