import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableProformasComponent } from './available-proformas.component';

describe('AvailableProformasComponent', () => {
  let component: AvailableProformasComponent;
  let fixture: ComponentFixture<AvailableProformasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableProformasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableProformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
