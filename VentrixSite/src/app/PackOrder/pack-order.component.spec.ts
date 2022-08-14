import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackOrderComponent } from './pack-order.component';

describe('PackOrderComponent', () => {
  let component: PackOrderComponent;
  let fixture: ComponentFixture<PackOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
