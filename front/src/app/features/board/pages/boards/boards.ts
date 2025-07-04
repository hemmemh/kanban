import { Component } from '@angular/core';
import { BoardsHeader } from '../../components/boards-header/boards-header';
import { BoardPreview } from '../../components/board-preview/board-preview';
import { Contain } from '../../../../shared/components/contain/contain';
import { CreateBoardButton } from '../../components/create-board-button/create-board-button';
import { BoardListService } from '../../services/board-list.service';
import { BoardService } from '../../services/board.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards',
  imports: [BoardsHeader, BoardPreview, Contain, CreateBoardButton, CommonModule],
  providers:[BoardListService, BoardService],
  templateUrl: './boards.html',
  styleUrl: './boards.scss'
})
export class Boards {

  boards$

  constructor(private boardListService:BoardListService){
   this.boards$  = this.boardListService.boards$
  }
  
}
