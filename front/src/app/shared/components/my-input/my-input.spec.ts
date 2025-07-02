import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInput } from './my-input';

describe('MyInput', () => {
  let component: MyInput;
  let fixture: ComponentFixture<MyInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
