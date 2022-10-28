import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T2HoursComponent } from './t2-hours.component';

describe('T2HoursComponent', () => {
  let component: T2HoursComponent;
  let fixture: ComponentFixture<T2HoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T2HoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T2HoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
