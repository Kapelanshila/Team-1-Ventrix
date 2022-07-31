import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAssignedAssetComponent } from './read-assigned-asset.component';

describe('ReadAssignedAssetComponent', () => {
  let component: ReadAssignedAssetComponent;
  let fixture: ComponentFixture<ReadAssignedAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAssignedAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAssignedAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
