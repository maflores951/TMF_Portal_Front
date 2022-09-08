import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarEmpresaMasivoComponent } from './actualizar-empresa-masivo.component';

describe('ActualizarEmpresaMasivoComponent', () => {
  let component: ActualizarEmpresaMasivoComponent;
  let fixture: ComponentFixture<ActualizarEmpresaMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarEmpresaMasivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarEmpresaMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
