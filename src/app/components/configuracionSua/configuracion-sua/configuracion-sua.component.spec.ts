import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionSuaComponent } from './configuracion-sua.component';

describe('ConfiguracionSuaComponent', () => {
  let component: ConfiguracionSuaComponent;
  let fixture: ComponentFixture<ConfiguracionSuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionSuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionSuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
