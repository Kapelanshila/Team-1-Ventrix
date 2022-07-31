import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCheckinComponent } from './read-checkin.component';

describe('ReadCheckinComponent', () => {
  let component: ReadCheckinComponent;
  let fixture: ComponentFixture<ReadCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCheckinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
