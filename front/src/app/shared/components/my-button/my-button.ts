import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MyButtonDirrective } from './my-button-dirrective';

@Component({
  selector: 'app-my-button',
  imports: [CommonModule, MyButtonDirrective],
  templateUrl: './my-button.html',
  styleUrl: './my-button.scss'
})
export class MyButton {

 

  @Input() className:string = ''
  @Input() disabled:boolean = false
  @Input() filled:boolean = false
  @Input() focus:boolean = true
  @Input() color:string = '#fff'
  @Output() onClick = new EventEmitter<MouseEvent>()



}
