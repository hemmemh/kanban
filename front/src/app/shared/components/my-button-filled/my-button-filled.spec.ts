import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyButtonFilled } from './my-button-filled';

describe('MyButtonFilled', () => {
  let component: MyButtonFilled;
  let fixture: ComponentFixture<MyButtonFilled>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyButtonFilled]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyButtonFilled);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
