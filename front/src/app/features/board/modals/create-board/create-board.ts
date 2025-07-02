import { Component } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { MyInput } from '../../../../shared/components/my-input/my-input';
import { MyButtonFilled } from '../../../../shared/components/my-button-filled/my-button-filled';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-board',
  imports: [MyButton, MyInput, MyButtonFilled],
  templateUrl: './create-board.html',
  styleUrl: './create-board.scss'
})
export class CreateBoard {

  constructor(private dialogRef:DialogRef){}

  close(){
    this.dialogRef.close()
  }
}
