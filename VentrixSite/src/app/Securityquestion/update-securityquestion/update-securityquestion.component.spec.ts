import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSecurityquestionComponent } from './update-securityquestion.component';

describe('UpdateSecurityquestionComponent', () => {
  let component: UpdateSecurityquestionComponent;
  let fixture: ComponentFixture<UpdateSecurityquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSecurityquestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSecurityquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
