import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTimeslotComponent } from './update-timeslot.component';

describe('UpdateTimeslotComponent', () => {
  let component: UpdateTimeslotComponent;
  let fixture: ComponentFixture<UpdateTimeslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTimeslotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
