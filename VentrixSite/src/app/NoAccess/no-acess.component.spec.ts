import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAcessComponent } from './no-acess.component';

describe('NoAcessComponent', () => {
  let component: NoAcessComponent;
  let fixture: ComponentFixture<NoAcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
