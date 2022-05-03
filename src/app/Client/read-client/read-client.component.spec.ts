import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadClientComponent } from './read-client.component';

describe('ReadClientComponent', () => {
  let component: ReadClientComponent;
  let fixture: ComponentFixture<ReadClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
