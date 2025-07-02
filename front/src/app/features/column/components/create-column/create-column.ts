import { Component, DOCUMENT, ElementRef, EventEmitter, HostListener, Inject, Output } from '@angular/core';
import { MyInput } from '../../../../shared/components/my-input/my-input';
import { MyButtonFilled } from '../../../../shared/components/my-button-filled/my-button-filled';

@Component({
  selector: 'app-create-column',
  imports: [MyInput, MyButtonFilled],
  templateUrl: './create-column.html',
  styleUrl: './create-column.scss'
})
export class CreateColumn {

  constructor(private elRef:ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickout(event:MouseEvent) {
    if(!this.elRef.nativeElement.contains(event.target)) {
       this.onClose.emit()
    } 
  }

  @Output() onClose = new EventEmitter()
}
