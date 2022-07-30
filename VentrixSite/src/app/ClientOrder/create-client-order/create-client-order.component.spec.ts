import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientOrderComponent } from './create-client-order.component';

describe('CreateClientOrderComponent', () => {
  let component: CreateClientOrderComponent;
  let fixture: ComponentFixture<CreateClientOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
