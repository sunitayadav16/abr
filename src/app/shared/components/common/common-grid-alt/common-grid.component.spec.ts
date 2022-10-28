import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonGridAltComponent } from './common-grid.component';

describe('CommonGridComponent', () => {
  let component: CommonGridAltComponent;
  let fixture: ComponentFixture<CommonGridAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonGridAltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonGridAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
