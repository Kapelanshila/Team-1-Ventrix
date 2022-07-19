import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatewarrantyperiodComponent } from './createwarrantyperiod.component';

describe('CreatewarrantyperiodComponent', () => {
  let component: CreatewarrantyperiodComponent;
  let fixture: ComponentFixture<CreatewarrantyperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatewarrantyperiodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatewarrantyperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
