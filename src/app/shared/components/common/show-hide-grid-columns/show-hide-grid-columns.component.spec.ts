import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHideGridColumnsComponent } from './show-hide-grid-columns.component';

describe('ShowHideGridColumnsComponent', () => {
  let component: ShowHideGridColumnsComponent;
  let fixture: ComponentFixture<ShowHideGridColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHideGridColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHideGridColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
