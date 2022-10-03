import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSamlComponent } from './error-saml.component';

describe('ErrorSamlComponent', () => {
  let component: ErrorSamlComponent;
  let fixture: ComponentFixture<ErrorSamlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorSamlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSamlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
