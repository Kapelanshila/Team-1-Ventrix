import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAssetComponent } from './read-asset.component';

describe('ReadAssetComponent', () => {
  let component: ReadAssetComponent;
  let fixture: ComponentFixture<ReadAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
