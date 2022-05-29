import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssetcategoryComponent } from './update-assetcategory.component';

describe('UpdateAssetcategoryComponent', () => {
  let component: UpdateAssetcategoryComponent;
  let fixture: ComponentFixture<UpdateAssetcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssetcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssetcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
