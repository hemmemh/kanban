import { Component, Input } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CardDrag } from '../../directives/card-drag';
import { CommonModule } from '@angular/common';
import { CardModel } from '../../models/card.model';

@Component({
  selector: 'app-card',
  imports: [Header, Footer, CardDrag, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  hostDirectives:[
    {
      directive:CardDrag,
      inputs:['card']
    }
  ],
  host:{
    '[attr.data-pos]': 'card.pos',
    '[attr.data-id]': 'card.id',
  }
})
export class Card {

  focused = false
  @Input({required:true}) card!:CardModel
}
