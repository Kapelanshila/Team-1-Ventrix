import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadClientOrderComponent } from './read-client-order.component';

describe('ReadClientOrderComponent', () => {
  let component: ReadClientOrderComponent;
  let fixture: ComponentFixture<ReadClientOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadClientOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadClientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
