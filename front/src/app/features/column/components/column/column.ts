import { Component, HostBinding } from '@angular/core';
import { Header } from '../header/header';
import { CreateCard } from '../create-card/create-card';
import { Card } from '../../../card/components/card/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-column',
  imports: [Header, CreateCard, Card, CommonModule],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  host:{
    'data-column-id':'1'
  }

})
export class Column {

   color:string = '#fde3aa'

  

  
}
