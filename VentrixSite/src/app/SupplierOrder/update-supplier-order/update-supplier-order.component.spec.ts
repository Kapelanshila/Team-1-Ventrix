import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupplierOrderComponent } from './update-supplier-order.component';

describe('UpdateSupplierOrderComponent', () => {
  let component: UpdateSupplierOrderComponent;
  let fixture: ComponentFixture<UpdateSupplierOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSupplierOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupplierOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
