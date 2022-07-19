import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssettypeComponent } from './update-assettype.component';

describe('UpdateAssettypeComponent', () => {
  let component: UpdateAssettypeComponent;
  let fixture: ComponentFixture<UpdateAssettypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssettypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
