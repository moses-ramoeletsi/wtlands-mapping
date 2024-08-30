import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  registerationType: string = 'register-user';

  constructor() { }

  ngOnInit() {
  }

  registerUser(){
    if(this.registerationType === 'register-user') {
      this.createUserAccount();
    }else if (this.registerationType ==='register-admin'){
      this.createAdminAccount();
    }
  }

  createUserAccount (){
    console.log('User added')
  }

  createAdminAccount(){
    console.log('admin ')
  }

  

}
