import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciationReportComponent } from './depreciation-report.component';

describe('DepreciationReportComponent', () => {
  let component: DepreciationReportComponent;
  let fixture: ComponentFixture<DepreciationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepreciationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreciationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
