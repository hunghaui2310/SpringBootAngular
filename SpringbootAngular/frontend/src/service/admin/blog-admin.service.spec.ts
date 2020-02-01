import { TestBed } from '@angular/core/testing';

import { BlogAdminService } from './blog-admin.service';

describe('BlogAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogAdminService = TestBed.get(BlogAdminService);
    expect(service).toBeTruthy();
  });
});
