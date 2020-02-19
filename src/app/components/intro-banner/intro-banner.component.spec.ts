import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroBannerComponent } from './intro-banner.component';

describe('IntroBannerComponent', () => {
  let component: IntroBannerComponent;
  let fixture: ComponentFixture<IntroBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
