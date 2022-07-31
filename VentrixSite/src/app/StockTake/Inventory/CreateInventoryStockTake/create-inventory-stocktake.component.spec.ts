import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventoryStocktakeComponent } from './create-inventory-stocktake.component';

describe('CreateInventoryStocktakeComponent', () => {
  let component: CreateInventoryStocktakeComponent;
  let fixture: ComponentFixture<CreateInventoryStocktakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInventoryStocktakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInventoryStocktakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
