import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEmailMasivoComponent } from './actualizar-email-masivo.component';

describe('ActualizarEmailMasivoComponent', () => {
  let component: ActualizarEmailMasivoComponent;
  let fixture: ComponentFixture<ActualizarEmailMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarEmailMasivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarEmailMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
