import { TestBed } from '@angular/core/testing';

import { AuthAdminItGuard } from './auth-admin-it.guard';

describe('AuthAdminItGuard', () => {
  let guard: AuthAdminItGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAdminItGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
