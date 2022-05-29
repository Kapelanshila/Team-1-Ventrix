import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSecurityquestionComponent } from './read-securityquestion.component';

describe('ReadSecurityquestionComponent', () => {
  let component: ReadSecurityquestionComponent;
  let fixture: ComponentFixture<ReadSecurityquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSecurityquestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSecurityquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
