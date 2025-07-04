import { Component, Injector, Input } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ColumnActions } from '../../modals/column-actions/column-actions';
import { ColumnModel } from '../../models/column.model';

@Component({
  selector: 'app-header',
  imports: [MyButton],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

 constructor(
  private dialog:Dialog, 
  private overlay:Overlay,
  private injector:Injector,
){}

  @Input({required:true}) column!:ColumnModel

    openColumnActions(event:MouseEvent){
      const target = event.target as HTMLElement
      const left = target.getBoundingClientRect().left
      const bottom = target.getBoundingClientRect().bottom
  
      const positionStrategy = this.overlay.position()
      .global()
      .left(left + 'px')
      .top(bottom + 5 + 'px')
  
      this.dialog.open(ColumnActions, {
        positionStrategy,
        minWidth:'300px',
        injector:this.injector,
        data:this.column
  });
  
    }
}
