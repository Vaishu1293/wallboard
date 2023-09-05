import { TestBed } from '@angular/core/testing';

import { CallListServiceService } from './call-list-service.service';

describe('CallListServiceService', () => {
  let service: CallListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
