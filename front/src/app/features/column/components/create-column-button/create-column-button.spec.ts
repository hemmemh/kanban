import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColumnButton } from './create-column-button';

describe('CreateColumnButton', () => {
  let component: CreateColumnButton;
  let fixture: ComponentFixture<CreateColumnButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateColumnButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateColumnButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
