import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientOrderlineComponent } from './update-client-orderline.component';

describe('UpdateClientOrderlineComponent', () => {
  let component: UpdateClientOrderlineComponent;
  let fixture: ComponentFixture<UpdateClientOrderlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClientOrderlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClientOrderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
