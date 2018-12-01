import { TestBed, inject } from '@angular/core/testing';

import { APIService } from './api.service';

describe('EnterpriseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIService]
    });
  });

  it('should be created', inject([APIService], (service: APIService) => {
    expect(service).toBeTruthy();
  }));
});
