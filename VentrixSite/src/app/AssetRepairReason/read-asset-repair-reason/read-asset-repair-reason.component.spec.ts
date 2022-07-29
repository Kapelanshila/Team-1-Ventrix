import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAssetRepairReasonComponent } from './read-asset-repair-reason.component';

describe('ReadAssetRepairReasonComponent', () => {
  let component: ReadAssetRepairReasonComponent;
  let fixture: ComponentFixture<ReadAssetRepairReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAssetRepairReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAssetRepairReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
