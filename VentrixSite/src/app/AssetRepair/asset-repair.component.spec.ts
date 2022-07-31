import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRepairComponent } from './asset-repair.component';

describe('AssetRepairComponent', () => {
  let component: AssetRepairComponent;
  let fixture: ComponentFixture<AssetRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
