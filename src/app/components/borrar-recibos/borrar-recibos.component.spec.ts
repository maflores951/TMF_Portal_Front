import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarRecibosComponent } from './borrar-recibos.component';

describe('BorrarRecibosComponent', () => {
  let component: BorrarRecibosComponent;
  let fixture: ComponentFixture<BorrarRecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarRecibosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
