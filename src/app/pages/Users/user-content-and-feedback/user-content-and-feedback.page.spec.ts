import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserContentAndFeedbackPage } from './user-content-and-feedback.page';

describe('UserContentAndFeedbackPage', () => {
  let component: UserContentAndFeedbackPage;
  let fixture: ComponentFixture<UserContentAndFeedbackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentAndFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
