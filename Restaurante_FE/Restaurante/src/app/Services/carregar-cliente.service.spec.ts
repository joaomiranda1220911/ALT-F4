import { TestBed } from '@angular/core/testing';

import { CarregarClienteService } from './carregar-cliente.service';

describe('CarregarClienteService', () => {
  let service: CarregarClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarregarClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
