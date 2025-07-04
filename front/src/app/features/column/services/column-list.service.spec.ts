import { TestBed } from '@angular/core/testing';

import { ColumnListService } from './column-list.service';

describe('ColumnListService', () => {
  let service: ColumnListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
