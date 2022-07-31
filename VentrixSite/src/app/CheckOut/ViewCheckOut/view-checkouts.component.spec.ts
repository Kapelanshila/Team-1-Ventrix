import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCheckoutsComponent } from './view-checkouts.component';

describe('ViewCheckoutsComponent', () => {
  let component: ViewCheckoutsComponent;
  let fixture: ComponentFixture<ViewCheckoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCheckoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCheckoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
