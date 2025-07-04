import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Component, ElementRef, Injector } from '@angular/core';
import { CreateBoard } from '../../modals/create-board/create-board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-create-board-button',
  imports: [],
  templateUrl: './create-board-button.html',
  styleUrl: './create-board-button.scss'
})
export class CreateBoardButton {

   constructor(
    private dialog:Dialog,  
    private overlay: Overlay,
    private elRef:ElementRef, 
    private injector:Injector,
  ){}

  openCreateBoard(event:MouseEvent){
    const target = this.elRef.nativeElement as HTMLElement
    const right = target.getBoundingClientRect().right
    const bottom = target.getBoundingClientRect().bottom

    const positionStrategy = this.overlay.position()
    .flexibleConnectedTo(this.elRef)
    .withPositions([ {
        originX: 'end', // Центр элемента-источника по X
        originY: 'center', // Центр элемента-источника по Y
        overlayX: 'start', // Центр диалога по X
        overlayY: 'center', // Центр диалога по Y
      }])

    this.dialog.open(CreateBoard, {
      positionStrategy,
      injector:this.injector,
      maxWidth:'300px'
});

  }


}
