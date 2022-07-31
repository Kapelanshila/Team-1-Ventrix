import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupplierOrderlineComponent } from './update-supplier-orderline.component';

describe('UpdateSupplierOrderlineComponent', () => {
  let component: UpdateSupplierOrderlineComponent;
  let fixture: ComponentFixture<UpdateSupplierOrderlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSupplierOrderlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupplierOrderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
