import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSupplierOrderlineComponent } from './read-supplier-orderline.component';

describe('ReadSupplierOrderlineComponent', () => {
  let component: ReadSupplierOrderlineComponent;
  let fixture: ComponentFixture<ReadSupplierOrderlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSupplierOrderlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSupplierOrderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
