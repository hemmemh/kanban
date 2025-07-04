import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { ColumnService } from '../../services/column.service';
import { ColumnModel } from '../../models/column.model';

@Component({
  selector: 'app-column-actions',
  imports: [],
  templateUrl: './column-actions.html',
  styleUrl: './column-actions.scss'
})
export class ColumnActions {

  constructor(
    private dialog:DialogRef,
    @Inject(DIALOG_DATA) public data: ColumnModel,
    private columnService:ColumnService
  ){}

  close(){
    this.dialog.close()
  }

  delete(){
    this.columnService.delete(this.data.id)
    this.close()
  }
}
