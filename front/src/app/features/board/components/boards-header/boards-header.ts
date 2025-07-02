import { Component } from '@angular/core';
import { Search } from '../../../../shared/components/search/search';
import { Contain } from '../../../../shared/components/contain/contain';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { MyButtonFilled } from "../../../../shared/components/my-button-filled/my-button-filled";
import { CreateBoard } from '../../modals/create-board/create-board';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-boards-header',
  imports: [Search, Contain,  MyButtonFilled],
  templateUrl: './boards-header.html',
  styleUrl: './boards-header.scss'
})
export class BoardsHeader {

  constructor(private dialog:Dialog,  private overlay: Overlay){}

  openCreateBoard(event:MouseEvent){
    const target = event.target as HTMLElement
    const left = target.getBoundingClientRect().left
    const bottom = target.getBoundingClientRect().bottom

    const positionStrategy = this.overlay.position()
    .global()
    .left(left + 'px')
    .top(bottom + 5 + 'px')

    this.dialog.open(CreateBoard, {
      positionStrategy,
      maxWidth:'300px'
});

  }
}
