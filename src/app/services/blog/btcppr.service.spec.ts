import { TestBed } from '@angular/core/testing';

import { BtcpprService } from './btcppr.service';

describe('BtcpprService', () => {
  let service: BtcpprService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtcpprService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
