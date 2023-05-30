import { TestBed } from '@angular/core/testing';

import { LieuStockageService } from './lieu-stockage.service';

describe('LieuStockageService', () => {
  let service: LieuStockageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LieuStockageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
