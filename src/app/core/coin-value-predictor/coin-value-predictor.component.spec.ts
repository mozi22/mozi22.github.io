import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinValuePredictorComponent } from './coin-value-predictor.component';

describe('CoinValuePredictorComponent', () => {
  let component: CoinValuePredictorComponent;
  let fixture: ComponentFixture<CoinValuePredictorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinValuePredictorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinValuePredictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
