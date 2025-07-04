import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { MyInput } from '../../../../shared/components/my-input/my-input';
import { MyButtonFilled } from '../../../../shared/components/my-button-filled/my-button-filled';
import { DialogRef } from '@angular/cdk/dialog';
import { BoardListService } from '../../services/board-list.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { BoardImagesService } from '../../services/board-images.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BoardService } from '../../services/board.service';
import { CreateBoardDTO } from '../../dto/create.board.dto';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-board',
  imports: [MyButton, MyInput, MyButtonFilled, CommonModule, FormsModule],
  providers:[BoardImagesService],
  templateUrl: './create-board.html',
  styleUrl: './create-board.scss'
})
export class CreateBoard implements OnInit, OnDestroy {
 backImages$;

  constructor(
    private dialogRef:DialogRef,
    private boardImagesService:BoardImagesService,
    private boardService:BoardService
  ){
    this.backImages$ = this.boardImagesService.backImages$
  }

  destroy$ = new Subject<void>()
  ngOnDestroy(): void {
   this.destroy$.next()
   this.destroy$.complete()
  }

  ngOnInit(): void {
    this.boardImagesService.backImages$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data =>{
     this.image = data[0]
    })
  }


 
  
  name:string = ''
  image:string = ''



  apiUrl = environment.apiUrl
  
  close(){
    this.dialogRef.close()
  }
  create(){
    const createBoard:Omit<CreateBoardDTO, 'ownerId'> = {
      name:this.name,
      image:this.image,

    }
    this.boardService.create(createBoard)
    this.close()
  }
}
