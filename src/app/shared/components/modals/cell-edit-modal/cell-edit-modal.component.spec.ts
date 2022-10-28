import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditModalComponent } from './cell-edit-modal.component';

describe('CellEditModalComponent', () => {
  let component: CellEditModalComponent;
  let fixture: ComponentFixture<CellEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
