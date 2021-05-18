import { TestBed } from '@angular/core/testing';
import { Snp500Service } from './snp500.service';

describe('Snp500Service', () => {
  let service: Snp500Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Snp500Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
