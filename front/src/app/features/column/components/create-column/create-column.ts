import { Component, DOCUMENT, ElementRef, EventEmitter, HostListener, Inject, Output } from '@angular/core';
import { MyInput } from '../../../../shared/components/my-input/my-input';
import { MyButtonFilled } from '../../../../shared/components/my-button-filled/my-button-filled';
import { FormsModule } from '@angular/forms';
import { ColumnService } from '../../services/column.service';
import { ActivatedRoute } from '@angular/router';
import { CreatelistDTO } from '../../dto/createList.dto';

@Component({
  selector: 'app-create-column',
  imports: [MyInput, MyButtonFilled, FormsModule],
  templateUrl: './create-column.html',
  styleUrl: './create-column.scss'
})
export class CreateColumn {

  constructor(
    private elRef:ElementRef,
    private columnService:ColumnService,
  ) {}

  name:string = ''
  @HostListener('document:click', ['$event'])
  clickout(event:MouseEvent) {
    if(!this.elRef.nativeElement.contains(event.target)) {
       this.onClose.emit()
    } 
  }

  @Output() onClose = new EventEmitter()

  create(){
    if(this.name.length === 0) return
    this.columnService.create(this.name)
    this.onClose.emit()
  }
}
