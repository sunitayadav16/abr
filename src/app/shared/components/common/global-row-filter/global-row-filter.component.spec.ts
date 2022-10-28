import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalRowFilterComponent } from './global-row-filter.component';

describe('GlobalRowFilterComponent', () => {
  let component: GlobalRowFilterComponent;
  let fixture: ComponentFixture<GlobalRowFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalRowFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalRowFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
