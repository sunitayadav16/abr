import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaLineDetailsComponent } from './proforma-line-details.component';

describe('ProformaLineDetailsComponent', () => {
  let component: ProformaLineDetailsComponent;
  let fixture: ComponentFixture<ProformaLineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaLineDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaLineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
