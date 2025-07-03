import { Component } from '@angular/core';
import { MyInput } from '../../../../shared/components/my-input/my-input';
import { MyTextAreaComponent } from '../../../../shared/components/my-text-area/my-text-area.component';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { MyButtonFilled } from '../../../../shared/components/my-button-filled/my-button-filled';
import { Overlay } from '@angular/cdk/overlay';
import { Dialog } from '@angular/cdk/dialog';
import { TagList } from '../../../tag/components/tag-list/tag-list';
import { Dates } from '../dates/dates';

@Component({
  selector: 'app-card-settings',
  imports: [MyInput, MyTextAreaComponent, MyButton, MyButtonFilled],
  templateUrl: './card-settings.html',
  styleUrl: './card-settings.scss'
})
export class CardSettings {


    constructor(private dialog:Dialog,  private overlay: Overlay){}

  openTagList(event:MouseEvent){
    const target = event.currentTarget as HTMLElement
    const left = target.getBoundingClientRect().left
    const bottom = target.getBoundingClientRect().bottom

    const positionStrategy = this.overlay.position()
    .global()
    .left(left + 'px')
    .top(bottom + 5 + 'px')

    this.dialog.open(TagList, {
      positionStrategy,
      maxWidth:'300px'
});

  }


    openDates(event:MouseEvent){
    const target = event.currentTarget as HTMLElement
    const left = target.getBoundingClientRect().left
    const bottom = target.getBoundingClientRect().bottom

    const positionStrategy = this.overlay.position()
    .global()
    .left(left + 'px')
    .top(bottom + 5 + 'px')

    this.dialog.open(Dates, {
      positionStrategy,
      minWidth:'300px'
});

  }

}
