import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventorycategoryComponent } from './update-inventorycategory.component';

describe('UpdateInventorycategoryComponent', () => {
  let component: UpdateInventorycategoryComponent;
  let fixture: ComponentFixture<UpdateInventorycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInventorycategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInventorycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
