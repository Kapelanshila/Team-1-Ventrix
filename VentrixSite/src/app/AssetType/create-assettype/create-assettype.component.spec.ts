import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssettypeComponent } from './create-assettype.component';

describe('CreateAssettypeComponent', () => {
  let component: CreateAssettypeComponent;
  let fixture: ComponentFixture<CreateAssettypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssettypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
