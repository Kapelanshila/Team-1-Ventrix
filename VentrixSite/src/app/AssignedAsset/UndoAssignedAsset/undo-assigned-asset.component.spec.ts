import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoAssignedAssetComponent } from './undo-assigned-asset.component';

describe('UndoAssignedAssetComponent', () => {
  let component: UndoAssignedAssetComponent;
  let fixture: ComponentFixture<UndoAssignedAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndoAssignedAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UndoAssignedAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
