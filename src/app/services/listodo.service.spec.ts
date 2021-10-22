import { TestBed } from '@angular/core/testing';

import { ListodoService } from './listodo.service';

describe('ListodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListodoService = TestBed.get(ListodoService);
    expect(service).toBeTruthy();
  });
});
