import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyDemandReportComponent } from './supply-demand-report.component';

describe('SupplyDemandReportComponent', () => {
  let component: SupplyDemandReportComponent;
  let fixture: ComponentFixture<SupplyDemandReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyDemandReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyDemandReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
