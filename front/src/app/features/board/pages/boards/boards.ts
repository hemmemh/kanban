import { Component } from '@angular/core';
import { BoardsHeader } from '../../components/boards-header/boards-header';
import { BoardPreview } from '../../components/board-preview/board-preview';
import { Contain } from '../../../../shared/components/contain/contain';
import { CreateBoardButton } from '../../components/create-board-button/create-board-button';

@Component({
  selector: 'app-boards',
  imports: [BoardsHeader, BoardPreview, Contain, CreateBoardButton],
  templateUrl: './boards.html',
  styleUrl: './boards.scss'
})
export class Boards {

}
