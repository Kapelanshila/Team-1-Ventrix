import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryTypeComponent } from './update-inventory-type.component';

describe('UpdateInventoryTypeComponent', () => {
  let component: UpdateInventoryTypeComponent;
  let fixture: ComponentFixture<UpdateInventoryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInventoryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInventoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
