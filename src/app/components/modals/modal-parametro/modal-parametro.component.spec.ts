import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParametroComponent } from './modal-parametro.component';

describe('ModalParametroComponent', () => {
  let component: ModalParametroComponent;
  let fixture: ComponentFixture<ModalParametroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParametroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
