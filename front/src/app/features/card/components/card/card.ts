import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-card',
  imports: [Header, Footer],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {

  focused = false
}
