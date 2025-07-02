import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPreview } from './board-preview';

describe('BoardPreview', () => {
  let component: BoardPreview;
  let fixture: ComponentFixture<BoardPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
