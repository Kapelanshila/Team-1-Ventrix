import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetWriteoffComponent } from './view-asset-writeoff.component';

describe('ViewAssetWriteoffComponent', () => {
  let component: ViewAssetWriteoffComponent;
  let fixture: ComponentFixture<ViewAssetWriteoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssetWriteoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetWriteoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
