import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WetlandsManagmentPage } from './wetlands-managment.page';

describe('WetlandsManagmentPage', () => {
  let component: WetlandsManagmentPage;
  let fixture: ComponentFixture<WetlandsManagmentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WetlandsManagmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
