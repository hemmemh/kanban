import { Component, Input } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { MyTextAreaComponent } from '../../../../shared/components/my-text-area/my-text-area.component';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../../card/services/card.service';
import { ColumnService } from '../../services/column.service';

@Component({
  selector: 'app-create-card',
  imports: [MyTextAreaComponent, FormsModule],
  templateUrl: './create-card.html',
  styleUrl: './create-card.scss',
})
export class CreateCard {

  constructor(
    private cardService:CardService,
    private columnService:ColumnService
  ){}


 name:string = ''
 @Input({required:true}) listID!:number

  create(){
    this.cardService.create(this.name, this.listID)
    this.columnService.SelectedColumnId = -1
  }
}
