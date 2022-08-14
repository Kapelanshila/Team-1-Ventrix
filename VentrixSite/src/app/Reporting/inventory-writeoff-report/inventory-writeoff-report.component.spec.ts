import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryWriteoffReportComponent } from './inventory-writeoff-report.component';

describe('InventoryWriteoffReportComponent', () => {
  let component: InventoryWriteoffReportComponent;
  let fixture: ComponentFixture<InventoryWriteoffReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryWriteoffReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryWriteoffReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
