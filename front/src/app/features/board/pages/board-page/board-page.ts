import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Column } from '../../../column/components/column/column';
import { Contain } from '../../../../shared/components/contain/contain';
import { CreateColumn } from '../../../column/components/create-column/create-column';
import { CreateColumnButton } from '../../../column/components/create-column-button/create-column-button';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ColumnListService } from '../../../column/services/column-list.service';
import { BoardService } from '../../services/board.service';
import { CommonModule } from '@angular/common';
import { BoardListService } from '../../services/board-list.service';
import { ColumnService } from '../../../column/services/column.service';
import { environment } from '../../../../../environments/environment.development';
import { CardService } from '../../../card/services/card.service';
import { CardListService } from '../../../card/services/card-list.service';

@Component({
  selector: 'app-board-page',
  imports: [Header, Column, Contain, CreateColumn, CreateColumnButton, CommonModule,],
  providers:[BoardService,ColumnListService, BoardListService, ColumnService, CardService, CardListService],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss'
})
export class BoardPage implements OnInit {

  isCreateColumn = false

   private destroy$ = new Subject<void>();
   columns$
   board$

   constructor(
    private route:ActivatedRoute,
    private cdr:ChangeDetectorRef,
    private boardService:BoardService,
    private columsListService:ColumnListService,
    private cardListService:CardListService
  ){
     this.columns$ = columsListService.columns$
     this.board$ = boardService.board$
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  apiUrl = environment.apiUrl
 async  ngOnInit() {

  

    this.route.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(async(data) => {
      const id = data['id']
      await this.boardService.getByID(id)
      await this.columsListService.fetch({boardId:id})
      await this.cardListService.fetch({boardId:id})
      this.cdr.markForCheck()
    });

  }
}
