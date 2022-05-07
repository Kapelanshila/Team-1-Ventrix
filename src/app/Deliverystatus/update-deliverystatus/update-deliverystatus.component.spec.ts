import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeliverystatusComponent } from './update-deliverystatus.component';

describe('UpdateDeliverystatusComponent', () => {
  let component: UpdateDeliverystatusComponent;
  let fixture: ComponentFixture<UpdateDeliverystatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDeliverystatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeliverystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
