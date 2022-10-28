import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaListTabComponent } from './proforma-list-tab.component';

describe('ProformaListTabComponent', () => {
  let component: ProformaListTabComponent;
  let fixture: ComponentFixture<ProformaListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProformaListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
