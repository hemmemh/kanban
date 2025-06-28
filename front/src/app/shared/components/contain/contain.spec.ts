import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contain } from './contain';

describe('Contain', () => {
  let component: Contain;
  let fixture: ComponentFixture<Contain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
