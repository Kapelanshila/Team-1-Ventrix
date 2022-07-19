import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadInventoryTypeComponent } from './read-inventory-type.component';

describe('ReadInventoryTypeComponent', () => {
  let component: ReadInventoryTypeComponent;
  let fixture: ComponentFixture<ReadInventoryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadInventoryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadInventoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
