import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationalPage } from './educational.page';

describe('EducationalPage', () => {
  let component: EducationalPage;
  let fixture: ComponentFixture<EducationalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
