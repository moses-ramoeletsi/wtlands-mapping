import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WetlandsMapPage } from './wetlands-map.page';

describe('WetlandsMapPage', () => {
  let component: WetlandsMapPage;
  let fixture: ComponentFixture<WetlandsMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WetlandsMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
