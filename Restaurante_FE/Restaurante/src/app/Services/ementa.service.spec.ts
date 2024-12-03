import { TestBed } from '@angular/core/testing';

import { EmentaService } from './ementa.service';

describe('EmentaService', () => {
  let service: EmentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
