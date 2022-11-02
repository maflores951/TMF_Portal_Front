import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarRecibosComponent } from './enviar-recibos.component';

describe('EnviarRecibosComponent', () => {
  let component: EnviarRecibosComponent;
  let fixture: ComponentFixture<EnviarRecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarRecibosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
