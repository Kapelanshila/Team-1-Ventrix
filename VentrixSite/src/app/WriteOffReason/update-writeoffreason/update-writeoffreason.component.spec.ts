import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWriteoffreasonComponent } from './update-writeoffreason.component';

describe('UpdateWriteoffreasonComponent', () => {
  let component: UpdateWriteoffreasonComponent;
  let fixture: ComponentFixture<UpdateWriteoffreasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWriteoffreasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWriteoffreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
