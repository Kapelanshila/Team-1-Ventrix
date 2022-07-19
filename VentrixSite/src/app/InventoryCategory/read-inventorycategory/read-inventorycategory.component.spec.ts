import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadInventorycategoryComponent } from './read-inventorycategory.component';

describe('ReadInventorycategoryComponent', () => {
  let component: ReadInventorycategoryComponent;
  let fixture: ComponentFixture<ReadInventorycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadInventorycategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadInventorycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
