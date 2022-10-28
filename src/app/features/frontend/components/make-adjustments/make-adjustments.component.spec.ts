import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAdjustmentsComponent } from './make-adjustments.component';

describe('MakeAdjustmentsComponent', () => {
  let component: MakeAdjustmentsComponent;
  let fixture: ComponentFixture<MakeAdjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAdjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
