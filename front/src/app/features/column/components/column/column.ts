import { Component, HostBinding, Input } from '@angular/core';
import { Header } from '../header/header';
import { CreateCard } from '../create-card/create-card';
import { Card } from '../../../card/components/card/card';
import { CommonModule } from '@angular/common';
import { CreateCardButton } from '../create-card-button/create-card-button';
import { ColumnDrag } from '../../directives/column-drag';
import { ColumnModel } from '../../models/column.model'
import { ColumnService } from '../../services/column.service';
import { CardListService } from '../../../card/services/card-list.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-column',
  imports: [Header, CreateCard,CreateCardButton, Card, CommonModule, ColumnDrag],
  templateUrl: './column.html',
  styleUrl: './column.scss',
  host:{
    '[attr.data-column-id]':'column.id',
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

   selectedColumnId$
   cards$
  constructor(
    private columnService:ColumnService,
    private cardListService:CardListService
  ){
    this.selectedColumnId$ = columnService.selectedColumnId$
    this.cards$ = cardListService.cards$.pipe(map(el => 
      el
      .filter(card => card.listId === this.column.id)
      .sort((a,b) => a.pos - b.pos)
    ))
  }
   @Input({required:true}) column!:ColumnModel

  
}
