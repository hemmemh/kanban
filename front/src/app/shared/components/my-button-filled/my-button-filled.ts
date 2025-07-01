import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { enhanceColor } from '../../utils/color.utils';

@Component({
  selector: 'app-my-button-filled',
  imports: [CommonModule],
  templateUrl: './my-button-filled.html',
  styleUrl: './my-button-filled.scss'
})
export class MyButtonFilled {

   @Input() color:string = '#3b79ce'
   @Input() textColor:string = '#fff'
   focused = false
   styled = {'backgroundColor':this.color, 'color':this.textColor}
   styledFocused = {'backgroundColor':enhanceColor(this.color, 1, 0.8), 'color':this.textColor}
}
