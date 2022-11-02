import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSamlComponent } from './inicio-saml.component';

describe('InicioSamlComponent', () => {
  let component: InicioSamlComponent;
  let fixture: ComponentFixture<InicioSamlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioSamlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSamlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
