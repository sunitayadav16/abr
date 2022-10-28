import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaBatchListComponent } from './proforma-batch-list.component';

describe('ProformaBatchListComponent', () => {
  let component: ProformaBatchListComponent;
  let fixture: ComponentFixture<ProformaBatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaBatchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaBatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
