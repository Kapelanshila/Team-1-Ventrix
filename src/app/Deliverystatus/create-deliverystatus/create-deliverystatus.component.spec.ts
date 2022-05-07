import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliverystatusComponent } from './create-deliverystatus.component';

describe('CreateDeliverystatusComponent', () => {
  let component: CreateDeliverystatusComponent;
  let fixture: ComponentFixture<CreateDeliverystatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDeliverystatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeliverystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
