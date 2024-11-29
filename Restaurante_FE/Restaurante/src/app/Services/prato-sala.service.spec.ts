import { TestBed } from '@angular/core/testing';

import { PratoSalaService } from './prato-sala.service';

describe('PratoSalaService', () => {
  let service: PratoSalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PratoSalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
