import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetcategoryComponent } from './create-assetcategory.component';

describe('CreateAssetcategoryComponent', () => {
  let component: CreateAssetcategoryComponent;
  let fixture: ComponentFixture<CreateAssetcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssetcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
