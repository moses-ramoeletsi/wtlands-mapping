import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-managment',
  templateUrl: './users-managment.page.html',
  styleUrls: ['./users-managment.page.scss'],
})
export class UsersManagmentPage implements OnInit {

  users$: Observable<any[]>;

  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.getUsersWithTypeUser();
  }


  ngOnInit() {
  }

}
