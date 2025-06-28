import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { MyButtonDirrective } from './my-button-dirrective';

@Component({
  selector: 'app-my-button',
  imports: [CommonModule, MyButtonDirrective],
  templateUrl: './my-button.html',
  styleUrl: './my-button.scss'
})
export class MyButton {

 

  @Input() className:string = ''
  @Input() color:string = '#f2f'



}
