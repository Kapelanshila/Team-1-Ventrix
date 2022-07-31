import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadClientOrderlineComponent } from './read-client-orderline.component';

describe('ReadClientOrderlineComponent', () => {
  let component: ReadClientOrderlineComponent;
  let fixture: ComponentFixture<ReadClientOrderlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadClientOrderlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadClientOrderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
