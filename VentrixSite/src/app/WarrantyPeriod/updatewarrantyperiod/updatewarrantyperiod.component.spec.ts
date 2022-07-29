import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatewarrantyperiodComponent } from './updatewarrantyperiod.component';

describe('UpdatewarrantyperiodComponent', () => {
  let component: UpdatewarrantyperiodComponent;
  let fixture: ComponentFixture<UpdatewarrantyperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatewarrantyperiodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatewarrantyperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
