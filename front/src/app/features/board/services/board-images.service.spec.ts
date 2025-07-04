import { TestBed } from '@angular/core/testing';

import { BoardImagesService } from './board-images.service';

describe('BoardImagesService', () => {
  let service: BoardImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
