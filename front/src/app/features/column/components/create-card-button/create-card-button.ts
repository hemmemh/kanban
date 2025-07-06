import { Component, Input } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { ColumnService } from '../../services/column.service';
import { ColumnModel } from '../../models/column.model';

@Component({
  selector: 'app-create-card-button',
  imports: [MyButton],
  templateUrl: './create-card-button.html',
  styleUrl: './create-card-button.scss',
  host:{
    'data-create': 'true'
  }
})
export class CreateCardButton {

  constructor(private columnService:ColumnService){}
 @Input({required:true}) column!:ColumnModel

 selectColumnId(){
  this.columnService.SelectedColumnId = this.column.id
 }
}
