import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstructionsModalComponent } from './view-instructions-modal.component';

describe('ViewInstructionsModalComponent', () => {
  let component: ViewInstructionsModalComponent;
  let fixture: ComponentFixture<ViewInstructionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstructionsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstructionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
