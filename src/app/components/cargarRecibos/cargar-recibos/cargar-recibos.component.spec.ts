import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarRecibosComponent } from './cargar-recibos.component';

describe('CargarRecibosComponent', () => {
  let component: CargarRecibosComponent;
  let fixture: ComponentFixture<CargarRecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarRecibosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
