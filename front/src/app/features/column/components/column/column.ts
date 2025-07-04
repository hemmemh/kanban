import { Component, HostBinding, Input } from '@angular/core';
import { Header } from '../header/header';
import { CreateCard } from '../create-card/create-card';
import { Card } from '../../../card/components/card/card';
import { CommonModule } from '@angular/common';
import { CreateCardButton } from '../create-card-button/create-card-button';
import { ColumnDrag } from '../../directives/column-drag';
import { ColumnModel } from '../../models/column.model'
@Component({
  selector: 'app-column',
  imports: [Header, CreateCard,CreateCardButton, Card, CommonModule, ColumnDrag],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  host:{
    'data-column-id':'1',
    '[attr.data-pos]': 'column.pos'
  },
 
  hostDirectives:[
    {
      directive:ColumnDrag,
      inputs:['column']
    }
  ],

})
export class Column {

   @Input({required:true}) column!:ColumnModel

  
}
