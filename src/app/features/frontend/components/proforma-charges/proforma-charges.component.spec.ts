import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaChargesComponent } from './proforma-charges.component';

describe('ProformaChargesComponent', () => {
  let component: ProformaChargesComponent;
  let fixture: ComponentFixture<ProformaChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
