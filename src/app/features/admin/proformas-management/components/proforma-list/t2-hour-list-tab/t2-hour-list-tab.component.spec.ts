import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T2HourListTabComponent } from './t2-hour-list-tab.component';

describe('T2HourListTabComponent', () => {
  let component: T2HourListTabComponent;
  let fixture: ComponentFixture<T2HourListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T2HourListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T2HourListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
