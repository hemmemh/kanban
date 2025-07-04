import { Injectable } from '@angular/core';
import { SnackBar } from '../../../shared/components/snack-bar/snack-bar';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BoardApi } from '../api/board.api';
import { BoardListService } from './board-list.service';
import { UpdateBoardDTO } from '../dto/update.board.dto';
import { GetAllBoardsDTO } from '../dto/getAllBoards.dto';
import { SnackBarService } from '../../../shared/components/snack-bar/snack-bar.service';
import { Board } from '../models/board.model';

@Injectable()
export class BoardService {

  constructor(
    private snackBar:SnackBarService,
    private boardApi:BoardApi,
    private boardListService:BoardListService
  ) { }


  private board = new BehaviorSubject<Board | null>(null)
  public board$ = this.board.asObservable()

  async getByID(id:number){
    try {
      const board = await firstValueFrom(this.boardApi.getByID(id))
      this.board.next(board) 
      return board
    } catch (error:any) {
        this.snackBar.open(error.error.message)
      return null
    }
  }

  async  create(dto:Omit<CreateBoardDTO, 'ownerId'>){
    try {
      const ownerId = localStorage.getItem('userId')
      if(!ownerId) return

      const board = await firstValueFrom(this.boardApi.create({...dto, ownerId:Number(ownerId)})) 
      this.boardListService.add(board)
      return board
    } catch (error:any) {
      this.snackBar.open(error.error.message)
      return null
    }

 }


   async  update(dto:UpdateBoardDTO){
    try {
      const board = await firstValueFrom(this.boardApi.update(dto)) 
      this.boardListService.replace(board)
      return board
    } catch (error:any) {
      this.snackBar.open(error.error.message)
      return null
    }

 }

    async  delete(id:number){
    try {
      const board = await firstValueFrom(this.boardApi.delete(id)) 
      this.boardListService.filter(id)
      return board
    } catch (error:any) {
      this.snackBar.open(error.error.message)
      return null
    }

 }

}
