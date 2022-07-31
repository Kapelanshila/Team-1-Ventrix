import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteOffInventoryComponent } from './write-off-inventory.component';

describe('WriteOffInventoryComponent', () => {
  let component: WriteOffInventoryComponent;
  let fixture: ComponentFixture<WriteOffInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteOffInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteOffInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
