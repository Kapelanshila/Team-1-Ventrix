import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSupplierOrderComponent } from './read-supplier-order.component';

describe('ReadSupplierOrderComponent', () => {
  let component: ReadSupplierOrderComponent;
  let fixture: ComponentFixture<ReadSupplierOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSupplierOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSupplierOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
