import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadWriteoffreasonComponent } from './read-writeoffreason.component';

describe('ReadWriteoffreasonComponent', () => {
  let component: ReadWriteoffreasonComponent;
  let fixture: ComponentFixture<ReadWriteoffreasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadWriteoffreasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadWriteoffreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
