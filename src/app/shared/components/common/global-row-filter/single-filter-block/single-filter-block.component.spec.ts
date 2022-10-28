import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFilterBlockComponent } from './single-filter-block.component';

describe('SingleFilterBlockComponent', () => {
  let component: SingleFilterBlockComponent;
  let fixture: ComponentFixture<SingleFilterBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFilterBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFilterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
