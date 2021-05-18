import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Snp500Component } from './snp500.component';

describe('Snp500Component', () => {
  let component: Snp500Component;
  let fixture: ComponentFixture<Snp500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Snp500Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Snp500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
