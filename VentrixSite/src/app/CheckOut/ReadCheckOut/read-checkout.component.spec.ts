import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCheckoutComponent } from './read-checkout.component';

describe('ReadCheckoutComponent', () => {
  let component: ReadCheckoutComponent;
  let fixture: ComponentFixture<ReadCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
