import { Component } from '@angular/core';
import { Contain } from '../../../../shared/components/contain/contain';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { BoardService } from '../../services/board.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [Contain, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  board$
  constructor(private boardService:BoardService){
    this.board$ = boardService.board$
  }
}
