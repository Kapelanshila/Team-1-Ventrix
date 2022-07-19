import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadwarrantyperiodComponent } from './readwarrantyperiod.component';

describe('ReadwarrantyperiodComponent', () => {
  let component: ReadwarrantyperiodComponent;
  let fixture: ComponentFixture<ReadwarrantyperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadwarrantyperiodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadwarrantyperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
