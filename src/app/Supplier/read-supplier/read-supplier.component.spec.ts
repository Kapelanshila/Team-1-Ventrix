import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSupplierComponent } from './read-supplier.component';

describe('ReadSupplierComponent', () => {
  let component: ReadSupplierComponent;
  let fixture: ComponentFixture<ReadSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
