import { TestBed } from '@angular/core/testing';

import { LoadConfigService } from './load-config.service';

describe('LoadConfigService', () => {
  let service: LoadConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
