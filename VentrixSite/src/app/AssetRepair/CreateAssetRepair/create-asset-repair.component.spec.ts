import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetRepairComponent } from './create-asset-repair.component';

describe('CreateAssetRepairComponent', () => {
  let component: CreateAssetRepairComponent;
  let fixture: ComponentFixture<CreateAssetRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssetRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
