import { TestBed } from '@angular/core/testing';

import { LocationMaterielService } from './location-materiel.service';

describe('LocationMaterielService', () => {
  let service: LocationMaterielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationMaterielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
