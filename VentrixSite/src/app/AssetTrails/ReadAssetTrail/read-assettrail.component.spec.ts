import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAssettrailComponent } from './read-assettrail.component';

describe('ReadAssettrailComponent', () => {
  let component: ReadAssettrailComponent;
  let fixture: ComponentFixture<ReadAssettrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAssettrailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAssettrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
