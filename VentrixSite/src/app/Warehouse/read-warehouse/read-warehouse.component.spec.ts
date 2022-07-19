import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadWarehouseComponent } from './read-warehouse.component';

describe('ReadWarehouseComponent', () => {
  let component: ReadWarehouseComponent;
  let fixture: ComponentFixture<ReadWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadWarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
