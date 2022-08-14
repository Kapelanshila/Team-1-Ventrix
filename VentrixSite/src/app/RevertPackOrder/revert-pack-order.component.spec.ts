import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertPackOrderComponent } from './revert-pack-order.component';

describe('RevertPackOrderComponent', () => {
  let component: RevertPackOrderComponent;
  let fixture: ComponentFixture<RevertPackOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevertPackOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertPackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
