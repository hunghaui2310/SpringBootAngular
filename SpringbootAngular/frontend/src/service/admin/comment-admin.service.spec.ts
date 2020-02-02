import { TestBed } from '@angular/core/testing';

import { CommentAdminService } from './comment-admin.service';

describe('CommentAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentAdminService = TestBed.get(CommentAdminService);
    expect(service).toBeTruthy();
  });
});
