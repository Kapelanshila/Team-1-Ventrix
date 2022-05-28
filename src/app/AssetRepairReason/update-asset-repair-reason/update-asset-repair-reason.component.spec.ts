import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssetRepairReasonComponent } from './update-asset-repair-reason.component';

describe('UpdateAssetRepairReasonComponent', () => {
  let component: UpdateAssetRepairReasonComponent;
  let fixture: ComponentFixture<UpdateAssetRepairReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssetRepairReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssetRepairReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
