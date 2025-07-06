import { Component, Inject, OnInit } from '@angular/core';
import { MyInput } from '../../../../shared/components/my-input/my-input';
import { MyTextAreaComponent } from '../../../../shared/components/my-text-area/my-text-area.component';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { MyButtonFilled } from '../../../../shared/components/my-button-filled/my-button-filled';
import { Overlay } from '@angular/cdk/overlay';
import { Dialog, DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TagList } from '../../../tag/components/tag-list/tag-list';
import { Dates } from '../dates/dates';
import { CardModel } from '../../models/card.model';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-settings',
  imports: [MyInput, MyTextAreaComponent, MyButton, MyButtonFilled, FormsModule],
  templateUrl: './card-settings.html',
  styleUrl: './card-settings.scss'
})
export class CardSettings implements OnInit{


    constructor(
      @Inject(DIALOG_DATA) public card: CardModel,
      private dialog:Dialog,  
      private overlay: Overlay, 
      private cardService:CardService,
      private dialogRef:DialogRef
    ){}

      name:string = ''
      description:string = ''

  ngOnInit(): void {
    this.name = this.card.name
    this.description = this.card.desc
  }



  close(){
      this.dialogRef.close()
  }


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

  update(){
    if(this.name.length === 0) return
    this.cardService.update({...this.card, name:this.name, desc:this.description})
    this.close()
  }
}
