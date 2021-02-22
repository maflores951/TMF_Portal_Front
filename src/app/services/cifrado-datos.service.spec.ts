import { TestBed } from '@angular/core/testing';

import { CifradoDatosService } from './cifrado-datos.service';

describe('CifradoDatosService', () => {
  let service: CifradoDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CifradoDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
