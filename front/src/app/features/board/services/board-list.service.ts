import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Board } from '../models/board.model';
import { SnackBar } from '../../../shared/components/snack-bar/snack-bar';
import { BoardApi } from '../api/board.api';
import { SnackBarService } from '../../../shared/components/snack-bar/snack-bar.service';

@Injectable()
export class BoardListService {

  constructor(
        private snackBar:SnackBarService,
        private boardApi:BoardApi,

  ) {
    this.fetch()
   }

  private boards = new BehaviorSubject<Board[]>([])
  public boards$ = this.boards.asObservable()



      get Boards(){
      return this.boards.value
    }
  
    set Boards(data:Board[]){
      this.boards.next(data)
    }

    add(board:Board){
       const boards = this.Boards
       boards.push(board)
       this.Boards = boards
    }

    filter(id:number){
      const boards = this.Boards
      this.Boards = boards.filter(el => el.id !== id)
    }

    replace(board:Board){
      const boards = this.Boards
      const index = boards.findIndex(el => el.id === board.id)
      boards.splice(index,1,board)
      this.Boards = structuredClone(boards)
    }


 async fetch(){
   try {
    console.log('fetch');
    
      const ownerId = localStorage.getItem('userId')
      const boards = await firstValueFrom(this.boardApi.getAll({ownerId:Number(ownerId)})) 
      this.Boards = boards
      return boards
    } catch (error:any) {
      this.snackBar.open(error.error.message)
      return null
    }
    }

}
