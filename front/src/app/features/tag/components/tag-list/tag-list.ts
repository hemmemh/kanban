import { Component } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-tag-list',
  imports: [MyButton],
  templateUrl: './tag-list.html',
  styleUrl: './tag-list.scss'
})
export class TagList {


  constructor(private dialogRef:DialogRef){}

  close(){
      this.dialogRef.close()
  }
}
