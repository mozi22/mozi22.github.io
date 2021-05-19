import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthyComponent } from './wealthy.component';

describe('WealthyComponent', () => {
  let component: WealthyComponent;
  let fixture: ComponentFixture<WealthyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WealthyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
