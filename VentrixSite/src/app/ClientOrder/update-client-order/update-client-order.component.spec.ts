import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientOrderComponent } from './update-client-order.component';

describe('UpdateClientOrderComponent', () => {
  let component: UpdateClientOrderComponent;
  let fixture: ComponentFixture<UpdateClientOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClientOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
