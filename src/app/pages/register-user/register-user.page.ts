import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {


  registerForm!: FormGroup;
  userData = {
    name: '',
    email: '',
    address: '',
    gender: '',
    password: '',
    uid: '',
    userType: 'user',
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
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
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
      const userData = { ...this.userData, ...this.registerForm.value };
      this.fireservices
        .signupWithEmail(userData)
        .then((userDetails) => {
          const user = userDetails.user;
          userData.uid = user?.uid as string;
          this.fireservices.saveUserDetails(userData).then(() => {
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
  userGender(value: string) {
    this.registerForm.get('gender')?.setValue(value);
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
