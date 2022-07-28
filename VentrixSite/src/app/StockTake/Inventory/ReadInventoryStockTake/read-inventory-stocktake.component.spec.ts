import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadInventoryStocktakeComponent } from './read-inventory-stocktake.component';

describe('ReadInventoryStocktakeComponent', () => {
  let component: ReadInventoryStocktakeComponent;
  let fixture: ComponentFixture<ReadInventoryStocktakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadInventoryStocktakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadInventoryStocktakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
