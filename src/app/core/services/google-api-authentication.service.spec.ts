import { TestBed } from '@angular/core/testing';

import { GoogleApiAuthenticationService } from './google-api-authentication.service';

describe('GoogleApiAuthenticationService', () => {
  let service: GoogleApiAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleApiAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
