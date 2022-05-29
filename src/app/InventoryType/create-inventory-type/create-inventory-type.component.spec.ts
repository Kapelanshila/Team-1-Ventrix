import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventoryTypeComponent } from './create-inventory-type.component';

describe('CreateInventoryTypeComponent', () => {
  let component: CreateInventoryTypeComponent;
  let fixture: ComponentFixture<CreateInventoryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInventoryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInventoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
