import { TestBed } from '@angular/core/testing';

import { BuscarService } from './buscar.service';

describe('BuscarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscarService = TestBed.get(BuscarService);
    expect(service).toBeTruthy();
  });
});
