import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAssetWriteoffComponent } from './read-asset-writeoff.component';

describe('ReadAssetWriteoffComponent', () => {
  let component: ReadAssetWriteoffComponent;
  let fixture: ComponentFixture<ReadAssetWriteoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAssetWriteoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAssetWriteoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
