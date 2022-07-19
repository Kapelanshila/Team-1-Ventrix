import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAssettypeComponent } from './read-assettype.component';

describe('ReadAssettypeComponent', () => {
  let component: ReadAssettypeComponent;
  let fixture: ComponentFixture<ReadAssettypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAssettypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAssettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
