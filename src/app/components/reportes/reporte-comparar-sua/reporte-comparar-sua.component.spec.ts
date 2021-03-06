import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCompararSuaComponent } from './reporte-comparar-sua.component';

describe('ReporteCompararSuaComponent', () => {
  let component: ReporteCompararSuaComponent;
  let fixture: ComponentFixture<ReporteCompararSuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCompararSuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCompararSuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
