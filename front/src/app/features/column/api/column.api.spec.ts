import { TestBed } from '@angular/core/testing';

import { ColumnApi } from './column.api';

describe('ColumnApi', () => {
  let service: ColumnApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
