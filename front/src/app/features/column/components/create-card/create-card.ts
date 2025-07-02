import { Component, Input } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { MyTextAreaComponent } from '../../../../shared/components/my-text-area/my-text-area.component';

@Component({
  selector: 'app-create-card',
  imports: [MyTextAreaComponent],
  templateUrl: './create-card.html',
  styleUrl: './create-card.scss',
    host:{
    'data-create': 'true'
  }
})
export class CreateCard {




  create(){}
}
