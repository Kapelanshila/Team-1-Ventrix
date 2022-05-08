import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtpTimerComponent } from './create-otp-timer.component';

describe('CreateOtpTimerComponent', () => {
  let component: CreateOtpTimerComponent;
  let fixture: ComponentFixture<CreateOtpTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOtpTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOtpTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
