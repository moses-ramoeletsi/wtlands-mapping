import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedWetlandsPage } from './saved-wetlands.page';

describe('SavedWetlandsPage', () => {
  let component: SavedWetlandsPage;
  let fixture: ComponentFixture<SavedWetlandsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedWetlandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
