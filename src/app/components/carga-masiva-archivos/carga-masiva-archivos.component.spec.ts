import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaMasivaArchivosComponent } from './carga-masiva-archivos.component';

describe('CargaMasivaArchivosComponent', () => {
  let component: CargaMasivaArchivosComponent;
  let fixture: ComponentFixture<CargaMasivaArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaMasivaArchivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaMasivaArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
