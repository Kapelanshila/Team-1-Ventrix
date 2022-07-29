import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSecurityquestionComponent } from './create-securityquestion.component';

describe('CreateSecurityquestionComponent', () => {
  let component: CreateSecurityquestionComponent;
  let fixture: ComponentFixture<CreateSecurityquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSecurityquestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSecurityquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
