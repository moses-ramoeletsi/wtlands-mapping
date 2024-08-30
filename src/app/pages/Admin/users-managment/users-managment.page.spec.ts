import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersManagmentPage } from './users-managment.page';

describe('UsersManagmentPage', () => {
  let component: UsersManagmentPage;
  let fixture: ComponentFixture<UsersManagmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
