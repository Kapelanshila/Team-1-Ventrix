import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetRepairReasonComponent } from './create-asset-repair-reason.component';

describe('CreateAssetRepairReasonComponent', () => {
  let component: CreateAssetRepairReasonComponent;
  let fixture: ComponentFixture<CreateAssetRepairReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssetRepairReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetRepairReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
