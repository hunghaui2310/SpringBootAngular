import { TestBed } from '@angular/core/testing';

import { CategoryAdminService } from './category-admin.service';

describe('CategoryAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryAdminService = TestBed.get(CategoryAdminService);
    expect(service).toBeTruthy();
  });
});
