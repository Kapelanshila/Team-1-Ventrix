import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetWriteoffComponent } from './create-asset-writeoff.component';

describe('CreateAssetWriteoffComponent', () => {
  let component: CreateAssetWriteoffComponent;
  let fixture: ComponentFixture<CreateAssetWriteoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssetWriteoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetWriteoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
