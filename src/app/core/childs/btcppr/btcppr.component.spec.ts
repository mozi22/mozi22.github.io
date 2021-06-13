import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtcpprComponent } from './btcppr.component';

describe('BtcpprComponent', () => {
  let component: BtcpprComponent;
  let fixture: ComponentFixture<BtcpprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtcpprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtcpprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
