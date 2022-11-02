import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisorPDfComponent } from './modal-visor-pdf.component';

describe('ModalVisorPDfComponent', () => {
  let component: ModalVisorPDfComponent;
  let fixture: ComponentFixture<ModalVisorPDfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisorPDfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisorPDfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
