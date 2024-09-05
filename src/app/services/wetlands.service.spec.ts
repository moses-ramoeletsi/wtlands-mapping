import { TestBed } from '@angular/core/testing';

import { WetlandsService } from './wetlands.service';

describe('WetlandsService', () => {
  let service: WetlandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WetlandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
