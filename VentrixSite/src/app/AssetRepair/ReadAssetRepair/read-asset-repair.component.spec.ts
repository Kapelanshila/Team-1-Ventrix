import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAssetRepairComponent } from './read-asset-repair.component';

describe('ReadAssetRepairComponent', () => {
  let component: ReadAssetRepairComponent;
  let fixture: ComponentFixture<ReadAssetRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAssetRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAssetRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
