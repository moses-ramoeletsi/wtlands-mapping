import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-activities',
  templateUrl: './users-activities.page.html',
  styleUrls: ['./users-activities.page.scss'],
})
export class UsersActivitiesPage implements OnInit {
  userId: string = '';
  savedWetlands$: Observable<any[]> = of([]);
  userFeedback$: Observable<any[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userId = id;
      this.loadUserData();
    } else {
      console.error('No user ID provided');
    }
  }

  loadUserData() {
    this.savedWetlands$ = this.usersService.getUserSavedWetlands(this.userId);
    this.userFeedback$ = this.usersService.getUserFeedback(this.userId);
  }
}