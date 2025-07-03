import { Component, Input } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';

@Component({
  selector: 'app-create-card-button',
  imports: [MyButton],
  templateUrl: './create-card-button.html',
  styleUrl: './create-card-button.scss',
  host:{
    'data-create': 'true'
  }
})
export class CreateCardButton {
 @Input({required:true}) color!:string
}
