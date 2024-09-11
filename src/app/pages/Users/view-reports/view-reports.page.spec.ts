import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewReportsPage } from './view-reports.page';

describe('ViewReportsPage', () => {
  let component: ViewReportsPage;
  let fixture: ComponentFixture<ViewReportsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
