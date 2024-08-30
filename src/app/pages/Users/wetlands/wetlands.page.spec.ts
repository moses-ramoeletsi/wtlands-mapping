import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WetlandsPage } from './wetlands.page';

describe('WetlandsPage', () => {
  let component: WetlandsPage;
  let fixture: ComponentFixture<WetlandsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WetlandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
