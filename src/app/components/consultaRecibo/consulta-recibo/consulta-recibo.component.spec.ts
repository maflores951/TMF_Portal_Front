import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaReciboComponent } from './consulta-recibo.component';

describe('ConsultaReciboComponent', () => {
  let component: ConsultaReciboComponent;
  let fixture: ComponentFixture<ConsultaReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaReciboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
