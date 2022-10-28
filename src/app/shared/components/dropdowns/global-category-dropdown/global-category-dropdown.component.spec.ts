import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCategoryDropdownComponent } from './global-category-dropdown.component';

describe('GlobalCategoryDropdownComponent', () => {
  let component: GlobalCategoryDropdownComponent;
  let fixture: ComponentFixture<GlobalCategoryDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalCategoryDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCategoryDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
