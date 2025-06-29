import { Component, HostBinding } from '@angular/core';
import { Header } from '../header/header';
import { CreateCard } from '../create-card/create-card';

@Component({
  selector: 'app-column',
  imports: [Header, CreateCard],
  templateUrl: './column.html',
  styleUrl: './column.scss',

})
export class Column {

   color:string = '#fde3aa'

    @HostBinding('style.backgroundColor') get bgColor() {
    return this.color;
  }

  
}
