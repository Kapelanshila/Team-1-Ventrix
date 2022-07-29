import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventorycategoryComponent } from './create-inventorycategory.component';

describe('CreateInventorycategoryComponent', () => {
  let component: CreateInventorycategoryComponent;
  let fixture: ComponentFixture<CreateInventorycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInventorycategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInventorycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
