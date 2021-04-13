import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillionairesComponent } from './billionaires.component';

describe('BillionairesComponent', () => {
  let component: BillionairesComponent;
  let fixture: ComponentFixture<BillionairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillionairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillionairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
