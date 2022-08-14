import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetWriteoffReportComponent } from './asset-writeoff-report.component';

describe('AssetWriteoffReportComponent', () => {
  let component: AssetWriteoffReportComponent;
  let fixture: ComponentFixture<AssetWriteoffReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetWriteoffReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetWriteoffReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
