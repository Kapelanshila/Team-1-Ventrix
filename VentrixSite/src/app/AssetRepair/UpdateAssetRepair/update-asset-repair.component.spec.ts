import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssetRepairComponent } from './update-asset-repair.component';

describe('UpdateAssetRepairComponent', () => {
  let component: UpdateAssetRepairComponent;
  let fixture: ComponentFixture<UpdateAssetRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssetRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssetRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
