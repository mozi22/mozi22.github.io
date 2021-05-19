import { TestBed } from '@angular/core/testing';

import { WealthyService } from './wealthy.service';

describe('WealthyService', () => {
  let service: WealthyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WealthyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
