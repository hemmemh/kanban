import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnActions } from './column-actions';

describe('ColumnActions', () => {
  let component: ColumnActions;
  let fixture: ComponentFixture<ColumnActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnActions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
