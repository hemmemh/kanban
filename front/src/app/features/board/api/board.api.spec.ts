import { TestBed } from '@angular/core/testing';

import { BoardApi } from './board.api';

describe('BoardApi', () => {
  let service: BoardApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
