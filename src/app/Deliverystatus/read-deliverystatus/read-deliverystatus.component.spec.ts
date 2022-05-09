import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDeliverystatusComponent } from './read-deliverystatus.component';

describe('ReadDeliverystatusComponent', () => {
  let component: ReadDeliverystatusComponent;
  let fixture: ComponentFixture<ReadDeliverystatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDeliverystatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDeliverystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
