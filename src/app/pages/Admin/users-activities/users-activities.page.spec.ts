import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersActivitiesPage } from './users-activities.page';

describe('UsersActivitiesPage', () => {
  let component: UsersActivitiesPage;
  let fixture: ComponentFixture<UsersActivitiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersActivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
