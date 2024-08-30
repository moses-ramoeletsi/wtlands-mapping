import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAndRegisterScreenPage } from './login-and-register-screen.page';

describe('LoginAndRegisterScreenPage', () => {
  let component: LoginAndRegisterScreenPage;
  let fixture: ComponentFixture<LoginAndRegisterScreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAndRegisterScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
