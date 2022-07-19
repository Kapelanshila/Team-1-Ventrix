import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAssetcategoryComponent } from './read-assetcategory.component';

describe('ReadAssetcategoryComponent', () => {
  let component: ReadAssetcategoryComponent;
  let fixture: ComponentFixture<ReadAssetcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAssetcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAssetcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
