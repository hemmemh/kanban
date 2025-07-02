import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-my-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './my-input.html',
  styleUrl: './my-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInput),
      multi: true
    }
  ],
})
export class MyInput implements ControlValueAccessor {

  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};
 
  value:number | string = ''
  focused = false

  @Input() placeHolder = ''
  @Output() input = new EventEmitter<string | number>()

 writeValue(value:string): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string | number) => void): void {
     this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
 
  onInputChange(event:Event): void {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.value = value;
    this.input.emit(value)
    this.onChange(value);
  
  }

  onBlur(): void {
    this.setFocused(false)
    this.onTouched();
  }
 


  setFocused(bool:boolean){
    this.focused = bool
  }

}
