import { TestBed } from '@angular/core/testing';

import { PresidentialCandidatesService } from './presidential-candidates.service';

describe('PresidentialCandidatesService', () => {
  let service: PresidentialCandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresidentialCandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
