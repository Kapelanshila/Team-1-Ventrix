import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertRepairComponent } from './revert-repair.component';

describe('RevertRepairComponent', () => {
  let component: RevertRepairComponent;
  let fixture: ComponentFixture<RevertRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevertRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
