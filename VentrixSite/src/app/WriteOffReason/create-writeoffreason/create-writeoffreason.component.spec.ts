import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWriteoffreasonComponent } from './create-writeoffreason.component';

describe('CreateWriteoffreasonComponent', () => {
  let component: CreateWriteoffreasonComponent;
  let fixture: ComponentFixture<CreateWriteoffreasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWriteoffreasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWriteoffreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
