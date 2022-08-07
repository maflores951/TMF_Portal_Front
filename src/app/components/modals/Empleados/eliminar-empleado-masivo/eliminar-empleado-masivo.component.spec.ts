import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEmpleadoMasivoComponent } from './eliminar-empleado-masivo.component';

describe('EliminarEmpleadoMasivoComponent', () => {
  let component: EliminarEmpleadoMasivoComponent;
  let fixture: ComponentFixture<EliminarEmpleadoMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarEmpleadoMasivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarEmpleadoMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
