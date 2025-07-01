import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Search),
      multi: true
    }
  ],
})
export class Search implements ControlValueAccessor{

  value:string = ''
  focused = false

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};


  @Output() input = new EventEmitter<string | number>()


  writeValue(value:string): void {
    if (value !== undefined) {
      this.value = value;
    }
  }
  registerOnChange(fn: any): void {
      this.onChange = fn
  }
  registerOnTouched(fn: any): void {
     this.onTouched = fn
  }

   onInputChange(event:Event): void {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.value = value;
    this.input.emit(value)
    this.onChange(value);
  }

    setFocused(bool:boolean){
    this.focused = bool
  }

    onBlur(): void {
    this.setFocused(false)
    this.onTouched();
  }


}
