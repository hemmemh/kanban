import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsHeader } from './boards-header';

describe('BoardsHeader', () => {
  let component: BoardsHeader;
  let fixture: ComponentFixture<BoardsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
