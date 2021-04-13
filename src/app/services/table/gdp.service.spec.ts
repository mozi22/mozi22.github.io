import { TestBed } from '@angular/core/testing';

import { GdpService } from './gdp.service';

describe('GdpService', () => {
  let service: GdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
