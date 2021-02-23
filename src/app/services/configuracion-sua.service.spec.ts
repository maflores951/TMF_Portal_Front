import { TestBed } from '@angular/core/testing';

import { ConfiguracionSuaService } from './configuracion-sua.service';

describe('ConfiguracionSuaService', () => {
  let service: ConfiguracionSuaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionSuaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
