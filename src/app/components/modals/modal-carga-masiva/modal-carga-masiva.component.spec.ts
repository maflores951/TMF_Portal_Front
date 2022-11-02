import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargaMasivaComponent } from './modal-carga-masiva.component';

describe('ModalCargaMasivaComponent', () => {
  let component: ModalCargaMasivaComponent;
  let fixture: ComponentFixture<ModalCargaMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCargaMasivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCargaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
