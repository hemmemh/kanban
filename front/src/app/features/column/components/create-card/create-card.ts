import { Component, Input } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';

@Component({
  selector: 'app-create-card',
  imports: [MyButton],
  templateUrl: './create-card.html',
  styleUrl: './create-card.scss',
    host:{
    'data-create': 'true'
  }
})
export class CreateCard {


  @Input({required:true}) color!:string
}
