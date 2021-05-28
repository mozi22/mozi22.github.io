import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialCandidatesComponent } from './presidential-candidates.component';

describe('PresidentialCandidatesComponent', () => {
  let component: PresidentialCandidatesComponent;
  let fixture: ComponentFixture<PresidentialCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentialCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
