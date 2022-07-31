import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTimeslotComponent } from './read-timeslot.component';

describe('ReadTimeslotComponent', () => {
  let component: ReadTimeslotComponent;
  let fixture: ComponentFixture<ReadTimeslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTimeslotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
